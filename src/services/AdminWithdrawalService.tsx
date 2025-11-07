import { axiosPrivate } from "../hooks/useAxios";
import { formatTime } from "../util/TimeHandle";

const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

export type AdminWithdrawalRequestProps = {
  id: string;
  walletId: string;
  amount: number;
  bankCode: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName?: string;
  status: string;
  adminNote?: string;
  processedBy?: string;
  processedOn?: string;
  walletBalanceSnapshot: number;
  createdOn: string;
};

/**
 * Admin: Lấy tất cả withdrawal requests
 * @param status - Optional filter by status (Pending, Approved, Rejected, Completed)
 * @returns Promise with list of withdrawal requests
 */
export async function GetAllWithdrawalRequests(status?: string): Promise<AdminWithdrawalRequestProps[]> {
  try {
    const url = status 
      ? `${API_URL}/payments/admin/withdrawal-requests?status=${status}`
      : `${API_URL}/payments/admin/withdrawal-requests`;
    
    const response = await axiosPrivate.get(url);
    
    if (response.status !== 200) {
      return [];
    }
    
    return response.data.map((item: any) => ({
      id: item.id,
      walletId: item.walletId,
      amount: item.amount,
      bankCode: item.bankCode,
      bankName: item.bankName,
      bankAccountNumber: item.bankAccountNumber,
      bankAccountName: item.bankAccountName,
      status: item.status,
      adminNote: item.adminNote,
      processedBy: item.processedBy,
      processedOn: item.processedOn ? formatTime(item.processedOn) : null,
      walletBalanceSnapshot: item.walletBalanceSnapshot,
      createdOn: formatTime(item.createdOn),
    }));
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
    return [];
  }
}

/**
 * Admin: Xử lý withdrawal request (Approve/Reject/Complete)
 * @param requestId - ID của withdrawal request
 * @param status - New status: "Approved", "Rejected", or "Completed"
 * @param adminNote - Optional admin note
 * @returns Promise<boolean>
 */
export async function ProcessWithdrawalRequest(
  requestId: string, 
  status: string, 
  adminNote?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axiosPrivate.put(
      `${API_URL}/payments/admin/withdrawal-requests/${requestId}`,
      {
        status,
        adminNote,
      }
    );
    
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.Message || "Xử lý yêu cầu thành công",
      };
    }
    
    return {
      success: false,
      message: "Xử lý yêu cầu thất bại",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.Message || "Đã xảy ra lỗi khi xử lý yêu cầu",
    };
  }
}
