import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import {
  GetAllWithdrawalRequests,
  ProcessWithdrawalRequest,
  AdminWithdrawalRequestProps,
} from "../../services/AdminWithdrawalService";

import "./AdminWithdrawalDashboard.scss";

const AdminWithdrawalDashboard: React.FC = () => {
  const [requests, setRequests] = useState<AdminWithdrawalRequestProps[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AdminWithdrawalRequestProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AdminWithdrawalRequestProps | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [actionType, setActionType] = useState<"Approved" | "Rejected" | "Completed" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const statusOptions = [
    { label: "Tất cả", value: "All" },
    { label: "Đang chờ", value: "Pending" },
    { label: "Đã duyệt", value: "Approved" },
    { label: "Hoàn thành", value: "Completed" },
    { label: "Từ chối", value: "Rejected" },
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((r) => r.status === statusFilter));
    }
  }, [statusFilter, requests]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await GetAllWithdrawalRequests();
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      toast.error("Không thể tải danh sách yêu cầu rút tiền");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (request: AdminWithdrawalRequestProps, action: "Approved" | "Rejected" | "Completed") => {
    setSelectedRequest(request);
    setActionType(action);
    setAdminNote("");
    setShowDialog(true);
  };

  const confirmAction = async () => {
    if (!selectedRequest || !actionType) return;

    setProcessing(true);
    try {
      const result = await ProcessWithdrawalRequest(selectedRequest.id, actionType, adminNote);

      if (result.success) {
        toast.success(result.message);
        setShowDialog(false);
        fetchRequests(); // Refresh list
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xử lý yêu cầu");
    } finally {
      setProcessing(false);
    }
  };

  const statusBodyTemplate = (rowData: AdminWithdrawalRequestProps) => {
    let severity: "success" | "info" | "warning" | "danger" = "info";
    let label = rowData.status;

    switch (rowData.status) {
      case "Pending":
        severity = "warning";
        label = "Đang chờ";
        break;
      case "Approved":
        severity = "info";
        label = "Đã duyệt";
        break;
      case "Completed":
        severity = "success";
        label = "Hoàn thành";
        break;
      case "Rejected":
        severity = "danger";
        label = "Từ chối";
        break;
    }

    return <Tag severity={severity} value={label} />;
  };

  const amountBodyTemplate = (rowData: AdminWithdrawalRequestProps) => {
    return (
      <div>
        <div style={{ fontWeight: "bold", color: "#e74c3c" }}>
          {rowData.amount.toLocaleString()} Xu
        </div>
        <div style={{ fontSize: "0.85rem", color: "#666" }}>
          Số dư: {rowData.walletBalanceSnapshot.toLocaleString()} Xu
        </div>
      </div>
    );
  };

  const bankInfoBodyTemplate = (rowData: AdminWithdrawalRequestProps) => {
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{rowData.bankName}</div>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          STK: {rowData.bankAccountNumber}
        </div>
        {rowData.bankAccountName && (
          <div style={{ fontSize: "0.85rem", color: "#999" }}>
            {rowData.bankAccountName}
          </div>
        )}
      </div>
    );
  };

  const adminNoteBodyTemplate = (rowData: AdminWithdrawalRequestProps) => {
    if (!rowData.adminNote) return <span style={{ color: "#999" }}>-</span>;
    return (
      <div style={{ maxWidth: "200px", wordBreak: "break-word" }}>
        {rowData.adminNote}
      </div>
    );
  };

  const dateBodyTemplate = (rowData: AdminWithdrawalRequestProps) => {
    return (
      <div>
        <div style={{ fontSize: "0.9rem" }}>
          <i className="pi pi-calendar mr-1" />
          {rowData.createdOn}
        </div>
        {rowData.processedOn && (
          <div style={{ fontSize: "0.85rem", color: "#27ae60", marginTop: "4px" }}>
            <i className="pi pi-check mr-1" />
            {rowData.processedOn}
          </div>
        )}
      </div>
    );
  };

  const actionBodyTemplate = (rowData: AdminWithdrawalRequestProps) => {
    const isPending = rowData.status === "Pending";
    const isApproved = rowData.status === "Approved";
    const isCompleted = rowData.status === "Completed";

    return (
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {isPending && (
          <>
            <Button
              icon="pi pi-check"
              rounded
              outlined
              severity="success"
              size="small"
              tooltip="Duyệt"
              tooltipOptions={{ position: "top" }}
              onClick={() => handleAction(rowData, "Approved")}
            />
            <Button
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              size="small"
              tooltip="Từ chối"
              tooltipOptions={{ position: "top" }}
              onClick={() => handleAction(rowData, "Rejected")}
            />
          </>
        )}
        {isApproved && (
          <Button
            icon="pi pi-check-circle"
            rounded
            outlined
            severity="info"
            size="small"
            tooltip="Hoàn thành"
            tooltipOptions={{ position: "top" }}
            onClick={() => handleAction(rowData, "Completed")}
          />
        )}
        {isCompleted && (
          <Tag severity="success" icon="pi pi-lock" value="Đã xong" />
        )}
        {rowData.status === "Rejected" && (
          <Tag severity="danger" icon="pi pi-ban" value="Đã từ chối" />
        )}
      </div>
    );
  };

  const getActionLabel = () => {
    switch (actionType) {
      case "Approved":
        return "Duyệt yêu cầu";
      case "Rejected":
        return "Từ chối yêu cầu";
      case "Completed":
        return "Hoàn thành yêu cầu";
      default:
        return "";
    }
  };

  const getActionDescription = () => {
    switch (actionType) {
      case "Approved":
        return "Xác nhận duyệt yêu cầu rút tiền này. User sẽ được thông báo.";
      case "Rejected":
        return "Từ chối yêu cầu rút tiền này. Vui lòng ghi rõ lý do từ chối.";
      case "Completed":
        return "⚠️ CẢNH BÁO: Hành động này sẽ TRỪ TIỀN khỏi ví user! Chỉ thực hiện sau khi đã chuyển tiền thực tế vào tài khoản ngân hàng của user.";
      default:
        return "";
    }
  };

  // Statistics
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    completed: requests.filter((r) => r.status === "Completed").length,
    rejected: requests.filter((r) => r.status === "Rejected").length,
    totalAmount: requests.reduce((sum, r) => sum + r.amount, 0),
    pendingAmount: requests
      .filter((r) => r.status === "Pending")
      .reduce((sum, r) => sum + r.amount, 0),
  };

  return (
    <div className="admin-withdrawal-dashboard">
      <div className="dashboard-header">
        <h1>
          <i className="pi pi-wallet mr-2" />
          Quản lý Yêu cầu Rút Tiền
        </h1>
        <Button
          icon="pi pi-refresh"
          label="Làm mới"
          outlined
          onClick={fetchRequests}
          loading={loading}
        />
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card className="stat-card stat-total">
          <div className="stat-content">
            <div className="stat-icon">
              <i className="pi pi-list" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Tổng yêu cầu</div>
            </div>
          </div>
        </Card>

        <Card className="stat-card stat-pending">
          <div className="stat-content">
            <div className="stat-icon">
              <i className="pi pi-clock" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Đang chờ</div>
              <div className="stat-amount">
                {stats.pendingAmount.toLocaleString()} Xu
              </div>
            </div>
          </div>
        </Card>

        <Card className="stat-card stat-approved">
          <div className="stat-content">
            <div className="stat-icon">
              <i className="pi pi-check" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-label">Đã duyệt</div>
            </div>
          </div>
        </Card>

        <Card className="stat-card stat-completed">
          <div className="stat-content">
            <div className="stat-icon">
              <i className="pi pi-check-circle" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Hoàn thành</div>
            </div>
          </div>
        </Card>

        <Card className="stat-card stat-rejected">
          <div className="stat-content">
            <div className="stat-icon">
              <i className="pi pi-times-circle" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.rejected}</div>
              <div className="stat-label">Từ chối</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <div className="filter-section">
        <label>Lọc theo trạng thái:</label>
        <Dropdown
          value={statusFilter}
          options={statusOptions}
          onChange={(e) => setStatusFilter(e.value)}
          placeholder="Chọn trạng thái"
          style={{ width: "200px" }}
        />
      </div>

      {/* Data Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <ProgressSpinner />
        </div>
      ) : (
        <DataTable
          value={filteredRequests}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="withdrawal-table"
          emptyMessage="Không có yêu cầu rút tiền nào"
          sortField="createdOn"
          sortOrder={-1}
        >
          <Column field="status" header="Trạng thái" body={statusBodyTemplate} sortable />
          <Column field="amount" header="Số tiền" body={amountBodyTemplate} sortable />
          <Column header="Thông tin ngân hàng" body={bankInfoBodyTemplate} />
          <Column header="Ghi chú admin" body={adminNoteBodyTemplate} />
          <Column field="createdOn" header="Thời gian" body={dateBodyTemplate} sortable />
          <Column header="Thao tác" body={actionBodyTemplate} />
        </DataTable>
      )}

      {/* Action Dialog */}
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header={getActionLabel()}
        style={{ width: "500px" }}
        modal
      >
        <div className="action-dialog-content">
          {selectedRequest && (
            <>
              <div className="request-summary">
                <p>
                  <strong>Số tiền:</strong>{" "}
                  <span style={{ color: "#e74c3c", fontSize: "1.2rem" }}>
                    {selectedRequest.amount.toLocaleString()} Xu
                  </span>
                </p>
                <p>
                  <strong>Ngân hàng:</strong> {selectedRequest.bankName}
                </p>
                <p>
                  <strong>Số tài khoản:</strong> {selectedRequest.bankAccountNumber}
                </p>
                {selectedRequest.bankAccountName && (
                  <p>
                    <strong>Tên tài khoản:</strong> {selectedRequest.bankAccountName}
                  </p>
                )}
                <p>
                  <strong>Số dư ví hiện tại:</strong>{" "}
                  {selectedRequest.walletBalanceSnapshot.toLocaleString()} Xu
                </p>
              </div>

              <div
                className={`action-warning ${
                  actionType === "Completed" ? "warning-critical" : ""
                }`}
              >
                <i
                  className={`pi ${
                    actionType === "Completed"
                      ? "pi-exclamation-triangle"
                      : "pi-info-circle"
                  } mr-2`}
                />
                {getActionDescription()}
              </div>

              <div className="admin-note-section">
                <label>
                  Ghi chú{actionType === "Rejected" ? " (Bắt buộc)" : " (Tùy chọn)"}:
                </label>
                <InputTextarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={4}
                  placeholder={
                    actionType === "Completed"
                      ? "VD: Đã chuyển tiền vào STK xxx vào lúc 14:30 ngày 05/11/2025"
                      : actionType === "Rejected"
                      ? "VD: Thông tin tài khoản không chính xác"
                      : "Nhập ghi chú..."
                  }
                  style={{ width: "100%" }}
                />
              </div>

              <div className="action-buttons">
                <Button
                  label="Hủy"
                  icon="pi pi-times"
                  outlined
                  onClick={() => setShowDialog(false)}
                  disabled={processing}
                />
                <Button
                  label={actionType === "Completed" ? "Xác nhận hoàn thành" : "Xác nhận"}
                  icon="pi pi-check"
                  severity={
                    actionType === "Approved"
                      ? "success"
                      : actionType === "Rejected"
                      ? "danger"
                      : "info"
                  }
                  onClick={confirmAction}
                  loading={processing}
                  disabled={actionType === "Rejected" && !adminNote.trim()}
                />
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AdminWithdrawalDashboard;
