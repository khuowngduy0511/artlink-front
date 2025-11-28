import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { TransactionHistoryProps } from "../TransactionHistory/TransactionHistory";
import { WalletHistoryProps } from "../WalletHistory/WalletHistory";

export type WithdrawalRequestProps = {
  id: string;
  amount: number;
  bankCode: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName?: string;
  status: string;
  adminNote?: string;
  walletBalanceSnapshot: number;
  createdOn: string;
  processedOn?: string;
};

export type GeneralTransactionHistoryProps = {
  transactionHistory?: TransactionHistoryProps;
  walletHistory?: WalletHistoryProps;
  withdrawalRequest?: WithdrawalRequestProps;
  createdOn: string;
};

interface GeneralTransactionHistoryList {
  generalTransactionHistory: GeneralTransactionHistoryProps[];
}

const GeneralTransactionHistory: React.FC<GeneralTransactionHistoryList> = (generalTransactionHistory) => {
  const detailRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && (
          <span className={rowData.transactionHistory.price > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.transactionHistory.price > 0 ? (
              <i className="pi pi-arrow-down mr-1" />
            ) : (
              <i className="pi pi-arrow-up mr-1" />
            )}
            {rowData.transactionHistory.detail}
          </span>
        )}
        {rowData.walletHistory && (
          <span className={rowData.walletHistory?.amount > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.walletHistory?.amount > 0 ? (
              <i className="pi pi-arrow-down mr-1" />
            ) : (
              <i className="pi pi-arrow-up mr-1" />
            )}
            {rowData.walletHistory?.type}
          </span>
        )}
        {rowData.withdrawalRequest && (
          <div>
            <span className="text-red-500">
              <i className="pi pi-arrow-up mr-1" />
              Yêu cầu rút tiền
            </span>
            <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "4px" }}>
              <div>{rowData.withdrawalRequest.bankName}</div>
              <div>STK: {rowData.withdrawalRequest.bankAccountNumber}</div>
            </div>
          </div>
        )}
      </>
    );
  };

  const methodRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && "Artlink"}
        {rowData.walletHistory && rowData.walletHistory.paymentMethod}
        {rowData.withdrawalRequest && "Chuyển khoản ngân hàng"}
      </>
    );
  };

  const amountRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && (
          <span className={rowData.transactionHistory.price > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.transactionHistory.price > 0
              ? `+${rowData.transactionHistory.price.toLocaleString()}`
              : `${rowData.transactionHistory.price.toLocaleString()}`}
          </span>
        )}
        {rowData.walletHistory && (
          <span className={rowData.walletHistory?.amount > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.walletHistory?.amount > 0
              ? `+${rowData.walletHistory?.amount.toLocaleString()}`
              : `${rowData.walletHistory?.amount.toLocaleString()}`}
          </span>
        )}
        {rowData.withdrawalRequest && (
          <span className="text-red-500">
            -{rowData.withdrawalRequest.amount.toLocaleString()}
          </span>
        )}
      </>
    );
  };

  const walletBalanceRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && <span>{rowData.transactionHistory.walletBalance.toLocaleString()}</span>}
        {rowData.walletHistory && <span>{rowData.walletHistory?.walletBalance.toLocaleString()}</span>}
        {rowData.withdrawalRequest && <span>{rowData.withdrawalRequest.walletBalanceSnapshot.toLocaleString()}</span>}
      </>
    );
  };

  const platformFeeRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && <span>{rowData.transactionHistory.fee.toLocaleString()}</span>}
        {rowData.walletHistory && <span>{0}</span>}
      </>
    );
  };

  const statusRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    // Withdrawal Request status
    if (rowData.withdrawalRequest) {
      let severity: "success" | "info" | "warning" | "danger" = "info";
      let label = rowData.withdrawalRequest.status;

      switch (rowData.withdrawalRequest.status) {
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
    }

    // Transaction History status
    if (rowData.transactionHistory) {
      return (
        <div
          style={{
            width: "fit-content",
            backgroundColor: rowData.transactionHistory.transactionStatus === "Thành công" ? "green" : "red",
            padding: "0.25rem 0.5rem",
            borderRadius: "1rem",
            color: "white",
            textAlign: "center",
          }}
        >
          {rowData.transactionHistory.transactionStatus}
        </div>
      );
    }

    // Wallet History status
    if (rowData.walletHistory) {
      return (
        <div
          style={{
            width: "fit-content",
            backgroundColor: rowData.walletHistory?.transactionStatus === "Thành công" ? "green" : "red",
            padding: "0.25rem 0.5rem",
            borderRadius: "1rem",
            color: "white",
            textAlign: "center",
          }}
        >
          {rowData.walletHistory?.transactionStatus}
        </div>
      );
    }

    return null;
  };

  return (
    <DataTable
      value={generalTransactionHistory.generalTransactionHistory}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy tham gia vào các dịch vụ của Artlink nhé!"
    >
      <Column field="generalTransactionHistory" header="Thông tin" body={detailRowTemplate} />
      <Column field="generalTransactionHistory" header="Phương thức" body={methodRowTemplate} />
      <Column field="generalTransactionHistory" header="Số Xu" body={amountRowTemplate} />
      <Column field="generalTransactionHistory" header="Số dư ví" body={walletBalanceRowTemplate} />
      <Column field="generalTransactionHistory" header="Phí nền tảng" body={platformFeeRowTemplate} />
      <Column field="generalTransactionHistory" header="Trạng thái" body={statusRowTemplate} />
      <Column field="createdOn" header="Ngày tạo" />
    </DataTable>
  );
};

export default GeneralTransactionHistory;
