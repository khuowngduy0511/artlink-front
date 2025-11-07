import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { TabMenu } from "primereact/tabmenu";

import { DeleteArtlinkData, GetArtlinksData } from "./ArtlinksService";
import ArtlinkCard, { ArtlinkProps } from "../../../components/ArtlinkCard";
import { toast } from "react-toastify";
import { CatchAPICallingError, ProgressSpinner } from "../..";
import "./ArtlinksView.scss";

const ArtlinksView: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [artlinks, setArtlinks] = useState<ArtlinkProps[]>([]);
  const [selectedArtlinkId, setSelectedArtlinkId] = useState<string>("");
  const [visibleDialogs, setVisibleDialogs] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(1); // Changed initial active tab index to 0
  const [pageNumber, setPageNumber] = useState(1);

  const items = [{ label: "Đang duyệt" }, { label: "Đã duyệt" }, { label: "Bị từ chối" }];

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtlinkRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
    setPageNumber(1); // Reset page number when tab changes
    setArtlinks([]); // Clear artlinks when tab changes
  };

  const deleteArtlinkHandler = async (artlinkId: string) => {
    try {
      const response = await DeleteArtlinkData(artlinkId);
      if (response === 204) {
        setArtlinks(artlinks.filter((artlink) => artlink.id !== artlinkId));
        toast.success("Xóa tác phẩm thành công");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    } finally {
      setVisibleDialogs(false);
    }
  };

  useEffect(() => {
    const fetchArtlinks = async () => {
      try {
        const response = await GetArtlinksData(8, pageNumber, accountId, activeTab);
        if (Array.isArray(response)) {
          setArtlinks((prevArtlinks) => {
            const uniqueArtlinkIds = new Set<string>(prevArtlinks.map((artlink) => artlink.id));
            const filteredArtlinks = Array.isArray(response)
              ? response.filter((artlink: { id: string }) => !uniqueArtlinkIds.has(artlink.id))
              : [];
            return [...prevArtlinks, ...filteredArtlinks];
          });
        } else {
          toast.error("Lấy dữ liệu tác phẩm thất bại");
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtlinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, activeTab, pageNumber]);

  useEffect(() => {
    setIsLoading(true);
    setArtlinks([]);
  }, [activeTab]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    if (lastArtlinkRef.current && observer.current) {
      observer.current.observe(lastArtlinkRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  return (
    <>
      {isCreator ? (
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
          className="w-max mb-3 text-black-alpha-90 text-sm"
        />
      ) : null}
      <div className="artwork-gallery">
        {isLoading && <ProgressSpinner />}
        {!isLoading && (
          <>
            {artlinks.length === 0 ? (
              isCreator ? (
                <Card className="add-artlink-card cursor-pointer flex flex-column justify-content-center align-items-center">
                  <i className="pi pi-plus-circle icon m-3" />
                  <Button
                    label="Tạo tác phẩm"
                    onClick={() => {
                      navigate("/artlink/post");
                    }}
                  ></Button>
                </Card>
              ) : (
                <div> Tác giả chưa có tác phẩm nào </div>
              )
            ) : (
              artlinks.map((artlink) => (
                <div className="gallery__item" key={artlink.id}>
                  <ArtlinkCard
                    key={artlink.id}
                    id={artlink.id}
                    title={artlink.title}
                    isCreator={isCreator}
                    privacy={artlink.privacy}
                    createdBy={artlink.createdBy}
                    creatorFullName={artlink.creatorFullName}
                    thumbnail={artlink.thumbnail}
                    likeCount={artlink.likeCount}
                    viewCount={artlink.viewCount}
                    deleteHandler={() => {
                      setVisibleDialogs(true);
                      setSelectedArtlinkId(artlink.id);
                    }}
                    updateHandler={() => navigate("/artlink/post")}
                    viewHandler={() => navigate(`/artlink/${artlink.id}`)}
                  />
                </div>
              ))
            )}
          </>
        )}
        <ConfirmDialog
          visible={visibleDialogs}
          headerClassName="confirm-dialog-header"
          header="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa tác phẩm này?"
          closable={false}
          onHide={() => setVisibleDialogs(false)}
          footer={
            <div>
              <Button onClick={() => deleteArtlinkHandler(selectedArtlinkId)}>Xác nhận</Button>
              <Button onClick={() => setVisibleDialogs(false)}>Hủy</Button>
            </div>
          }
        >
          <h3>Bạn có chắc muốn xóa tác phẩm này?</h3>
        </ConfirmDialog>
      </div>
      <div ref={lastArtlinkRef}>{/* This is an invisible marker to observe */}</div>
    </>
  );
};

export default ArtlinksView;
