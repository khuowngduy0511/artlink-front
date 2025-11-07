import React from "react";
import { Avatar } from "primereact/avatar";
import { ListBox } from "primereact/listbox";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./ProfilePopup.scss";
import { Button } from "primereact/button";
import { getAuthInfo } from "../util/AuthUtil";

interface ProfilePopupProps {
  fullname: string;
  email: string;
  avatar: string;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ fullname, email, avatar }) => {
  const navigate = useNavigate();
  const profileId = getAuthInfo()?.id;

  const handleProfileClick = () => {
    navigate(`/account/${profileId}/artwork`);
  };

  const authInfo = getAuthInfo();
  const isAdmin = authInfo?.role === "Admin" || authInfo?.role === "Moderator";

  const items = [
    <Link key="artwork" className="link" to={`/account/${profileId}/artwork`}>
      Quản lý tác phẩm
    </Link>,
    <Link key="collection" className="link" to={`/account/${profileId}/collection`}>
      Quản lý bộ sưu tập
    </Link>,
    <Link key="request" className="link" to={`/my-requests`}>
      Quản lý yêu cầu
    </Link>,
    <Link key="service" className="link" to={`/account/${profileId}/service`}>
      Quản lý dịch vụ
    </Link>,
    <Link key="wallet" className="link" to={`/account/${profileId}/wallet`}>
      Quản lý ví
    </Link>,
    <Link key="assets" className="link" to={`/account/${profileId}/assets`} state={{ boughtAssetTabValue: 1 }}>
      Tài nguyên đã mua
    </Link>,
    ...(isAdmin ? [
      <Link key="moderation" className="link admin-link" to="/admin/moderation/artworks">
        <i className="pi pi-shield" /> Duyệt tác phẩm
      </Link>,
      <Link key="withdrawal" className="link admin-link" to="/admin/withdrawal-requests">
        <i className="pi pi-money-bill" /> Quản lý rút tiền
      </Link>,
    ] : []),
    <Link key="help" className="link" to="/policy">
      Trợ giúp
    </Link>,
  ];

  return (
    <div className="notification-container-profile">
      <div className="user-information-bar" onClick={handleProfileClick}>
        <Avatar image={avatar} style={{ padding: "0" }} size="xlarge" shape="circle" />
        <h3>{fullname}</h3>
        <p>{email}</p>
        <Button label="Trang cá nhân" onClick={handleProfileClick} />
      </div>

      <div className="list-box">
        <ListBox options={items} className="w-full md:w-14rem" />
      </div>
    </div>
  );
};

export default ProfilePopup;
