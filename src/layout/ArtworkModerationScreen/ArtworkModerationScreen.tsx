import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import axios from "axios";
import "./ArtworkModerationScreen.scss";

const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

interface Artwork {
  id: string;
  title: string;
  thumbnail: string;
  createdBy: {
    id: string;
    fullName: string;
    username: string;
  };
  createdOn: string;
  state: string;
  privacy: string;
}

export default function ArtworkModerationScreen() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [action, setAction] = useState<number>(1); // 0=Waiting, 1=Accepted, 2=Declined, 3=Cancelled
  const [note, setNote] = useState("");
  const toast = useRef<Toast>(null);

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const authData = localStorage.getItem("authData");
      const token = authData ? JSON.parse(authData)?.accessToken : null;
      
      if (!token) {
        toast.current?.show({
          severity: "error",
          summary: "Lỗi xác thực",
          detail: "Vui lòng đăng nhập lại",
        });
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`${API_URL}/moderation/artworks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { State: "Waiting" }, // Chỉ lấy artwork đang chờ duyệt
      });
      setArtworks(response.data.items || []);
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: error.response?.data?.errorMessage || "Không thể tải danh sách tác phẩm",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleApprove = (artwork: Artwork, approved: boolean) => {
    setSelectedArtwork(artwork);
    setAction(approved ? 1 : 2); // 1 = Accepted, 2 = Declined
    setNote("");
    setShowDialog(true);
  };

  const confirmAction = async () => {
    if (!selectedArtwork) return;

    // Validate note is required for Declined action (2 = Declined)
    if (action === 2 && !note.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Thiếu thông tin",
        detail: "Vui lòng nhập lý do từ chối",
      });
      return;
    }

    try {
      const authData = localStorage.getItem("authData");
      const token = authData ? JSON.parse(authData)?.accessToken : null;
      
      if (!token) {
        toast.current?.show({
          severity: "error",
          summary: "Lỗi xác thực",
          detail: "Vui lòng đăng nhập lại",
        });
        return;
      }
      
      await axios.put(
        `${API_URL}/moderation/artworks/${selectedArtwork.id}/state`,
        { state: action, note: note || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.current?.show({
        severity: "success",
        summary: "Thành công",
        detail: `Đã ${action === 1 ? "chấp nhận" : "từ chối"} tác phẩm "${selectedArtwork.title}"`,
      });

      setShowDialog(false);
      fetchArtworks(); // Reload list
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: error.response?.data?.errorMessage || "Không thể cập nhật trạng thái",
      });
    }
  };

  const thumbnailTemplate = (rowData: Artwork) => {
    return (
      <Image
        src={rowData.thumbnail}
        alt={rowData.title}
        width="80"
        preview
      />
    );
  };

  const titleTemplate = (rowData: Artwork) => {
    return (
      <div>
        <div className="font-bold">{rowData.title}</div>
        <div className="text-sm text-gray-500">ID: {rowData.id.substring(0, 8)}...</div>
      </div>
    );
  };

  const authorTemplate = (rowData: Artwork) => {
    return (
      <div>
        <div className="font-semibold">{rowData.createdBy.fullName}</div>
        <div className="text-sm text-gray-500">@{rowData.createdBy.username}</div>
      </div>
    );
  };

  const dateTemplate = (rowData: Artwork) => {
    return new Date(rowData.createdOn).toLocaleString("vi-VN");
  };

  const stateTemplate = (rowData: Artwork) => {
    const getSeverity = () => {
      switch (rowData.state) {
        case "Waiting":
          return "warning";
        case "Accepted":
          return "success";
        case "Rejected":
          return "danger";
        default:
          return "info";
      }
    };

    const getLabel = () => {
      switch (rowData.state) {
        case "Waiting":
          return "Chờ duyệt";
        case "Accepted":
          return "Đã duyệt";
        case "Rejected":
          return "Đã từ chối";
        default:
          return rowData.state;
      }
    };

    return <Tag value={getLabel()} severity={getSeverity()} />;
  };

  const actionTemplate = (rowData: Artwork) => {
    if (rowData.state !== "Waiting") return null;

    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-check"
          severity="success"
          size="small"
          tooltip="Chấp nhận"
          onClick={() => handleApprove(rowData, true)}
        />
        <Button
          icon="pi pi-times"
          severity="danger"
          size="small"
          tooltip="Từ chối"
          onClick={() => handleApprove(rowData, false)}
        />
        <Button
          icon="pi pi-eye"
          severity="info"
          size="small"
          tooltip="Xem chi tiết"
          onClick={() => window.open(`/artlink/${rowData.id}`, "_blank")}
        />
      </div>
    );
  };

  return (
    <div className="artwork-moderation-screen">
      <Toast ref={toast} />
      <div className="container">
        <div className="header">
          <h1>Duyệt tác phẩm</h1>
          <Button
            label="Làm mới"
            icon="pi pi-refresh"
            onClick={fetchArtworks}
            loading={loading}
          />
        </div>

        <DataTable
          value={artworks}
          loading={loading}
          paginator
          rows={10}
          emptyMessage="Không có tác phẩm nào chờ duyệt"
          className="moderation-table"
        >
          <Column header="Ảnh" body={thumbnailTemplate} style={{ width: "100px" }} />
          <Column header="Tên tác phẩm" body={titleTemplate} />
          <Column header="Tác giả" body={authorTemplate} />
          <Column header="Ngày đăng" body={dateTemplate} />
          <Column header="Trạng thái" body={stateTemplate} style={{ width: "120px" }} />
          <Column header="Hành động" body={actionTemplate} style={{ width: "180px" }} />
        </DataTable>
      </div>

      <Dialog
        header={action === 1 ? "Chấp nhận tác phẩm" : "Từ chối tác phẩm"}
        visible={showDialog}
        style={{ width: "500px" }}
        onHide={() => setShowDialog(false)}
        footer={
          <div>
            <Button label="Hủy" icon="pi pi-times" onClick={() => setShowDialog(false)} text />
            <Button
              label="Xác nhận"
              icon="pi pi-check"
              onClick={confirmAction}
              severity={action === 1 ? "success" : "danger"}
            />
          </div>
        }
      >
        <div className="flex flex-column gap-3">
          <p>
            Bạn có chắc chắn muốn{" "}
            <strong>{action === 1 ? "chấp nhận" : "từ chối"}</strong> tác phẩm "
            {selectedArtwork?.title}"?
          </p>
          {action === 2 && (
            <div>
              <label htmlFor="note" className="block mb-2">
                Lý do từ chối <span className="text-red-500">*</span>
              </label>
              <InputTextarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Nhập lý do từ chối tác phẩm..."
                className="w-full"
                required
              />
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
