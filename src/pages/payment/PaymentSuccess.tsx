import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAuthInfo } from "../../util/AuthUtil";
import "./PaymentResult.scss";
import { axiosPrivate } from "../../hooks/useAxios";
import { GetWalletData } from "../../layout/ProfileScreen/WalletView/WalletService";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    const txId = searchParams.get("txId");
    
    if (!txId) {
      setMessage("Thiếu mã giao dịch");
      setLoading(false);
      setPolling(false);
      return;
    }

    let pollCount = 0;
    const maxPolls = 20; // Poll tối đa 20 lần (20 giây)
    
    const pollTransactionStatus = async () => {
      try {
        pollCount++;
        
        // Gọi API kiểm tra transaction status
        const resp: any = await axiosPrivate.get(`/payos/transaction/${txId}/status`);
        
        if (resp?.data?.status === "Success") {
          // Transaction đã được webhook xử lý thành công
          setPolling(false);
          
          // Lấy thông tin ví mới
          const authInfo = getAuthInfo();
          if (authInfo?.id) {
            const wallet = await GetWalletData(authInfo.id);
            setMessage(
              wallet?.balance 
                ? `Nạp tiền thành công! Số dư hiện tại: ${wallet.balance.toLocaleString()} Xu` 
                : "Nạp tiền thành công!"
            );
          } else {
            setMessage("Nạp tiền thành công! Vui lòng vào trang ví để kiểm tra số dư.");
          }
          setLoading(false);
        } else if (resp?.data?.status === "Failed" || resp?.data?.status === "Cancelled") {
          // Transaction thất bại
          setPolling(false);
          setMessage("Giao dịch thất bại. Vui lòng thử lại.");
          setLoading(false);
        } else if (pollCount >= maxPolls) {
          // Đã poll quá số lần cho phép
          setPolling(false);
          setMessage("Đang xử lý thanh toán. Vui lòng kiểm tra lại sau ít phút hoặc xem lịch sử giao dịch.");
          setLoading(false);
        }
        // Nếu status vẫn là InProgress, tiếp tục poll
      } catch (err) {
        console.error("Error checking transaction status:", err);
        
        if (pollCount >= maxPolls) {
          setPolling(false);
          setMessage("Không thể kiểm tra trạng thái giao dịch. Vui lòng kiểm tra lại trong mục lịch sử giao dịch.");
          setLoading(false);
        }
      }
    };

    // Poll lần đầu ngay lập tức
    pollTransactionStatus();

    // Setup interval để poll mỗi giây
    const intervalId = setInterval(() => {
      if (polling) {
        pollTransactionStatus();
      }
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [searchParams, polling]);

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
            <p className="text-sm text-gray-500 mt-2">
              Vui lòng đợi trong giây lát, hệ thống đang xử lý giao dịch của bạn
            </p>
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
