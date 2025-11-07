import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./PaymentResult.scss";

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleRetry = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="payment-result-container">
      <Card className="payment-result-card cancel">
        <div className="text-center">
          <i className="pi pi-times-circle cancel-icon"></i>
          <h2 className="mt-3">Thanh toán đã bị hủy</h2>
          <p className="message">
            Giao dịch của bạn đã bị hủy. Nếu đây là lỗi, vui lòng thử lại.
          </p>
          
          <div className="button-group mt-4">
            <Button
              label="Về trang chủ"
              icon="pi pi-home"
              className="p-button-outlined"
              onClick={handleBackToHome}
            />
            <Button
              label="Thử lại"
              icon="pi pi-refresh"
              severity="warning"
              onClick={handleRetry}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentCancel;
