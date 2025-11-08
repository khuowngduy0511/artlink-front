import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";

import { GetGeneralTransactionHistoryData, GetTransactionHistoryData, GetWalletData, GetWalletHistoryData } from "./WalletService";
import { getAuthInfo } from "../../../util/AuthUtil";
import DepositCoin from "./DepositCoin/DepositCoin";
import WithdrawCoin from "./WithdrawCoin/WithdrawCoin";
import WalletInformation from "./WalletInformation/WalletInformation";
import WalletHistory, { WalletHistoryProps } from "./WalletHistory/WalletHistory";
import TransactionHistory, { TransactionHistoryProps } from "./TransactionHistory/TransactionHistory";

import "./WalletView.scss";
import { ProgressSpinner } from "primereact/progressspinner";
import { CatchAPICallingError } from "../..";
import { useNavigate } from "react-router-dom";
import GeneralTransactionHistory, { GeneralTransactionHistoryProps } from "./GeneralTransactionHistory/GeneralTransactionHistory";

const zalopayLogo = require("../../../assets/logo/zalopay-logo.png");

export type WalletProps = {
  balance: number;
  withdrawMethod: string;
  withdrawInformation: string;
  bankCode?: string;
  bankName?: string;
};

const WalletView: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [wallet, setWallet] = useState<WalletProps>();
  const [generalTransactionHistory, setGeneralTransactionHistory] = useState<GeneralTransactionHistoryProps[]>([]); 
  const [walletHistory, setWalletHistory] = useState<WalletHistoryProps[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryProps[]>([]);
  const [isWalletInformationVisible, setIsWalletInformationVisible] = useState(false);
  const [isDepositDialogVisible, setIsDepositDialogVisible] = useState(false);
  const [isWithdrawDialogVisible, setIsWithdrawDialogVisible] = useState(false);

  const items = [{ label: "Tất cả" }, { label: "Lịch sử rút nạp xu" }, { label: "Lịch sử giao dịch xu" }];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const wallet = await GetWalletData(getAuthInfo()?.id);
        setWallet(wallet);
        if (activeTab === 0) {
          const generalTransactionHistory = await GetGeneralTransactionHistoryData(getAuthInfo()?.id);
          setGeneralTransactionHistory(generalTransactionHistory);
        }
        else if (activeTab === 1) {
          const walletHistory = await GetWalletHistoryData(getAuthInfo()?.id);
          setWalletHistory(walletHistory);
        } else {
          const transactionHistory = await GetTransactionHistoryData(getAuthInfo()?.id);
          setTransactionHistory(transactionHistory);
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setRefresh(false);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refresh, activeTab, navigate]);

  return (
    <div className="wallet-view">
      {isLoading && <ProgressSpinner />}
      {!isLoading && (
        <>
          <div className="wallet-info-section">
            <h1 className="wallet-title">Thông tin ví</h1>
            {wallet?.withdrawInformation || wallet?.bankCode ? (
              <div className="bank-info-container">
                {wallet?.bankCode && wallet?.bankName ? (
                  <div className="bank-card">
                    <div className="bank-header">
                      <i className="pi pi-building text-2xl"></i>
                      <h3 className="bank-name">{wallet.bankName}</h3>
                    </div>
                    <div className="bank-details">
                      <div className="detail-row">
                        <span className="detail-label">Mã ngân hàng:</span>
                        <span className="detail-value">{wallet.bankCode}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Số tài khoản:</span>
                        <span className="detail-value font-bold">{wallet.withdrawInformation}</span>
                      </div>
                    </div>
                  </div>
                ) : wallet?.withdrawMethod === "Zalopay" ? (
                  <div className="payment-method-card">
                    <img style={{ width: "120px", margin: "0 auto" }} src={zalopayLogo} alt="ZaloPay" />
                    <div className="detail-row mt-3">
                      <span className="detail-label">Số điện thoại:</span>
                      <span className="detail-value font-bold">{wallet.withdrawInformation}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <h2 className="text-center font-bold mt-4">
                Hãy cập nhật thông tin ví của bạn để trải nghiệm các dịch vụ có trong Artlink nhé!
              </h2>
            )}

            <div className="w-full flex justify-content-center align-items-center mt-4">
              <Button
                label="Cập nhật thông tin ví"
                className="p-button-raised p-button-rounded"
                onClick={() => setIsWalletInformationVisible(true)}
              />
            </div>
          </div>

          <div className="balance-info-section">
            <h1 className="m-0">Số dư</h1>
            <h1 className="balance-info">{wallet?.balance?.toLocaleString() || 0} Xu</h1>
            <div className="action-section">
              {wallet?.withdrawInformation && wallet?.withdrawMethod ? (
                <>
                  <Button
                    label="Nạp tiền"
                    className="deposit-btn p-button-raised p-button-rounded"
                    onClick={() => setIsDepositDialogVisible(true)}
                  />
                  <DepositCoin isVisible={isDepositDialogVisible} onHide={() => setIsDepositDialogVisible(false)} />

                  <Button
                    label="Rút tiền"
                    className="withdraw-btn p-button-raised p-button-rounded"
                    onClick={() => setIsWithdrawDialogVisible(true)}
                  />
                  <WithdrawCoin
                    balance={wallet?.balance}
                    isVisible={isWithdrawDialogVisible}
                    hideCallback={() => setIsWithdrawDialogVisible(false)}
                    refreshCallback={() => {
                      setRefresh(true);
                    }}
                    phoneNumber={wallet?.withdrawInformation}
                    hasBankAccount={!!wallet?.bankCode}
                  />
                </>
              ) : (
                <>
                  <Button
                    label="Thêm phương thức thanh toán"
                    className="p-button-raised p-button-rounded"
                    onClick={() => setIsWalletInformationVisible(true)}
                  />
                </>
              )}
            </div>
          </div>

          <WalletInformation
            isVisible={isWalletInformationVisible}
            refreshCallback={() => setRefresh(true)}
            onHide={() => setIsWalletInformationVisible(false)}
          />

          <div className="history-section">
            <h1 className="history-title">Lịch sử giao dịch</h1>
            <TabMenu
              model={items}
              activeIndex={activeTab}
              onTabChange={(e) => setActiveTab(e.index)}
              className="tab-menu w-max mb-3 text-black-alpha-90"
            />

            {activeTab === 0 && <GeneralTransactionHistory generalTransactionHistory={generalTransactionHistory} />}
            {activeTab === 1 && <WalletHistory walletHistory={walletHistory} />}
            {activeTab === 2 && <TransactionHistory transactions={transactionHistory} />}
          </div>
        </>
      )}
    </div>
  );
};

export default WalletView;
