import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAuthInfo } from "../../util/AuthUtil";
import "./PaymentResult.scss";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const txId = searchParams.get("txId");
    const assetId = searchParams.get("assetId");
    
    // Simulate checking payment status
    setTimeout(() => {
      setLoading(false);
      if (assetId) {
        setMessage("Thanh toán mua asset thành công! Bạn đã có thể tải xuống tài nguyên.");
      } else {
        setMessage("Nạp tiền vào ví thành công!");
      }
    }, 2000);
  }, [searchParams]);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleViewWallet = () => {
    const authInfo = getAuthInfo();
    const accountId = authInfo?.id || "00000000-0000-0000-0000-000000000007";
    navigate(`/account/${accountId}/wallet`);
  };

  if (loading) {
    return (
      <div className="payment-result-container">
        <Card className="payment-result-card">
          <div className="text-center">
            <ProgressSpinner />
            <h3 className="mt-3">Đang xác nhận thanh toán...</h3>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <Card className="payment-result-card success">
        <div className="text-center">
          <i className="pi pi-check-circle success-icon"></i>
          <h2 className="mt-3">Thanh toán thành công!</h2>
          <p className="message">{message}</p>
          
          <div className="button-group mt-4">
            <Button
              label="Về trang chủ"
              icon="pi pi-home"
              className="p-button-outlined"
              onClick={handleBackToHome}
            />
            <Button
              label="Xem ví"
              icon="pi pi-wallet"
              onClick={handleViewWallet}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
