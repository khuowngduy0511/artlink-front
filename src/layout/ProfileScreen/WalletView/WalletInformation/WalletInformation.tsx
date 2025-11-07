import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import {
  GetBankList,
  UpdateBankAccount,
} from "../WalletService";
import "./WalletInformation.scss";
import { toast } from "react-toastify";

interface BankOption {
  code: string;
  name: string;
  shortName: string;
}

interface WalletInformationProps {
  isVisible: boolean;
  refreshCallback: () => void;
  onHide: () => void;
}

const WalletInformation: React.FC<WalletInformationProps> = ({
  isVisible,
  refreshCallback,
  onHide,
}) => {
  const [loading, setLoading] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [bankList, setBankList] = useState<BankOption[]>([]);

  useEffect(() => {
    // Fetch bank list when dialog opens
    if (isVisible) {
      GetBankList()
        .then((banks) => {
          setBankList(banks);
        })
        .catch((error) => {
          console.error("Failed to load bank list:", error);
          toast.error("Không thể tải danh sách ngân hàng");
        });
    }
  }, [isVisible]);

  let content = (
    <div className="wallet-info">
      <h1 className="mb-6 text-center">Cập nhật thông tin ngân hàng</h1>
      
      <div className="input-container">
        <label htmlFor="bankSelect" className="label text-base">
          Chọn ngân hàng
        </label>
        <Dropdown
          inputId="bankSelect"
          value={selectedBank}
          options={bankList}
          onChange={(e) => setSelectedBank(e.value)}
          optionLabel="name"
          placeholder="Chọn ngân hàng"
          filter
          filterBy="name,shortName"
          className="w-full"
          emptyMessage="Không tìm thấy ngân hàng"
        />
      </div>
      <div className="input-container">
        <label htmlFor="bankAccountNumber" className="label text-base">
          Số tài khoản
        </label>
        <InputText
          id="bankAccountNumber"
          placeholder="Nhập số tài khoản"
          value={bankAccountNumber}
          onChange={(e) => setBankAccountNumber(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="btn-container">
        <Button
          label="Cập nhật"
          className="update-btn  p-button-rounded text-base pl-5 pr-5"
          loading={loading}
          onClick={() => {
            setLoading(true);
            handleSaveBankAccount(bankAccountNumber, selectedBank);
          }}
        />
        <Button
          label="Hủy"
          className="p-button p-button-rounded text-base pl-5 pr-5"
          onClick={onHide}
        />
      </div>
    </div>
  );

  const handleSaveBankAccount = async (accountNumber: string, bank: BankOption | null) => {
    try {
      if (!accountNumber || !bank) {
        toast.warning("Vui lòng nhập đầy đủ thông tin ngân hàng");
        setLoading(false);
        return;
      }

      const success = await UpdateBankAccount(accountNumber, bank.code, bank.name);
      if (success) {
        toast.success("Cập nhật thông tin ngân hàng thành công");
        setLoading(false);
        refreshCallback();
        onHide();
      } else {
        toast.error("Cập nhật thông tin ngân hàng không thành công");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Cập nhật thông tin ngân hàng không thành công");
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        showHeader={false}
        visible={isVisible}
        className="wallet-information-dialog"
        contentStyle={{ borderRadius: "12px" }}
        style={{ width: "fit-content" }}
        modal={true}
        dismissableMask={true}
        onHide={onHide}
      >
        {content}
      </Dialog>
    </>
  );
};

export default WalletInformation;
