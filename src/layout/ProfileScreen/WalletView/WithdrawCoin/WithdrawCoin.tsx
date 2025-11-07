import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

import "./WithdrawCoin.scss";
import { CreateWithdrawalRequest } from "../WalletService";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WithdrawCoin: React.FC<{
  balance: number;
  isVisible: boolean;
  hideCallback: () => void;
  phoneNumber: string;
  refreshCallback: () => void;
  hasBankAccount: boolean;
}> = ({ balance, isVisible, hideCallback, phoneNumber, refreshCallback, hasBankAccount }) => {
  const [amount, setAmount] = useState<number>(10000);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleWithdrawBtn = () => {
    if (!hasBankAccount) {
      toast.error("Vui lòng cập nhật thông tin tài khoản ngân hàng trước khi rút tiền");
      setLoading(false);
      return;
    }

    if (amount < 10000) {
      toast.error("Số Xu rút tối thiểu là 10.000 Xu");
      setLoading(false);
      return;
    }

    if (amount > balance) {
      toast.error("Số dư không đủ để thực hiện giao dịch này");
      setLoading(false);
      return;
    }

    CreateWithdrawalRequest(amount)
      .then((data) => {
        setLoading(false);
        toast.success("Yêu cầu rút tiền đã được gửi thành công. Chúng tôi sẽ xử lý trong 1-3 ngày làm việc.");
        refreshCallback();
        hideCallback();
        setAmount(10000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Không thể tạo yêu cầu rút tiền");
        CatchAPICallingError(error, navigate);
      });
  };

  return (
    <>
      <Dialog
        closable={false}
        visible={isVisible}
        onHide={hideCallback}
        dismissableMask={true}
        className="withdraw-dialog"
        headerClassName="withdraw-dialog-header"
      >
        <div className="withdraw-dialog-content">
          <h1>Rút Xu</h1>
          <div className="amount-input">
            <label className="amount-label">Số Xu cần rút</label>
            <InputNumber
              className="w-full md:w-14rem"
              value={amount}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                e?.value && setAmount(e.value)
              }
              min={10000}
              max={balance}
            />
            <p className="flex align-items-center">
              <i className="pi pi-info-circle mr-1" /> Số Xu rút tối thiểu: 10.000 Xu
            </p>
            <p className="flex align-items-center mt-2">
              <i className="pi pi-clock mr-1" /> Thời gian xử lý: 1-3 ngày làm việc
            </p>
            {!hasBankAccount && (
              <p className="flex align-items-center mt-2" style={{ color: '#e74c3c' }}>
                <i className="pi pi-exclamation-triangle mr-1" /> 
                Vui lòng cập nhật thông tin tài khoản ngân hàng ở tab "Thông tin ví"
              </p>
            )}
          </div>

          <div className="action-button">
            <Button
              rounded
              className="confirm-btn"
              label="Rút"
              onClick={() => {
                setLoading(true);
                handleWithdrawBtn();
              }}
              loading={loading}
            />
            <Button
              rounded
              className="cancel-btn"
              label="Hủy"
              onClick={hideCallback}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WithdrawCoin;
