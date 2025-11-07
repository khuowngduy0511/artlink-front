import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";

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

export type WithdrawalRequestListProps = {
  withdrawalRequests: WithdrawalRequestProps[];
};

const WithdrawalRequestHistory: React.FC<WithdrawalRequestListProps> = ({ withdrawalRequests }) => {
  const amountRowTemplate = (rowData: WithdrawalRequestProps) => {
    return (
      <span className="text-red-500">
        {rowData.amount.toLocaleString()} Xu
      </span>
    );
  };

  const bankInfoRowTemplate = (rowData: WithdrawalRequestProps) => {
    return (
      <div>
        <div style={{ fontWeight: 'bold' }}>{rowData.bankName}</div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          {rowData.bankAccountNumber}
        </div>
      </div>
    );
  };

  const statusRowTemplate = (rowData: WithdrawalRequestProps) => {
    let severity: "success" | "info" | "warning" | "danger" = "info";
    let icon = "pi-clock";
    let label = rowData.status;

    switch (rowData.status) {
      case "Pending":
        severity = "warning";
        icon = "pi-clock";
        label = "Đang chờ";
        break;
      case "Approved":
        severity = "info";
        icon = "pi-check";
        label = "Đã duyệt";
        break;
      case "Completed":
        severity = "success";
        icon = "pi-check-circle";
        label = "Hoàn thành";
        break;
      case "Rejected":
        severity = "danger";
        icon = "pi-times-circle";
        label = "Từ chối";
        break;
    }

    return (
      <Tag 
        severity={severity} 
        icon={`pi ${icon}`}
        value={label}
      />
    );
  };

  const adminNoteRowTemplate = (rowData: WithdrawalRequestProps) => {
    if (!rowData.adminNote) return <span style={{ color: '#999' }}>-</span>;
    return (
      <div style={{ maxWidth: '200px' }}>
        {rowData.adminNote}
      </div>
    );
  };

  const dateRowTemplate = (rowData: WithdrawalRequestProps) => {
    return (
      <div>
        <div style={{ fontSize: '0.9rem' }}>
          <i className="pi pi-calendar mr-1" />
          {rowData.createdOn}
        </div>
        {rowData.processedOn && (
          <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
            <i className="pi pi-check mr-1" />
            Xử lý: {rowData.processedOn}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="withdrawal-request-history">
      <DataTable
        value={withdrawalRequests}
        className="w-full"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        emptyMessage="Chưa có yêu cầu rút tiền nào"
      >
        <Column 
          field="amount" 
          header="Số tiền" 
          body={amountRowTemplate} 
          sortable
        />
        <Column 
          header="Thông tin ngân hàng" 
          body={bankInfoRowTemplate}
        />
        <Column 
          field="status" 
          header="Trạng thái" 
          body={statusRowTemplate} 
          sortable
        />
        <Column 
          header="Ghi chú admin" 
          body={adminNoteRowTemplate}
        />
        <Column 
          header="Thời gian" 
          body={dateRowTemplate} 
          sortable
          field="createdOn"
        />
      </DataTable>
    </div>
  );
};

export default WithdrawalRequestHistory;
