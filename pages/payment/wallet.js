import React, { useState } from "react";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import BalanceCard from "../../components/wallet/BalanceCard";
import WithdrawModal from "../../components/wallet/WithdrawModal";
import AddWalletAmountModal from "../../components/wallet/AddWalletAmountModal";
import SendMoneyModal from "../../components/wallet/SendMoneyModal.jsx";
import { TbCurrencyNaira } from "react-icons/tb";
import { ImBook } from "react-icons/im";
import { BiDollarCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import {
  getSelectorsByUserAgent,
  isMobileOnly,
  isMobile,
} from "react-device-detect";
import { getCookies } from "cookies-next";
import { END } from "redux-saga";
import { wrapper } from "../../store";
import { fetchWalletDetailsStart } from "../../store/slices/walletSlice";
import { fetchAllTransactionStart } from "../../store/slices/transactionSlice";

const Wallet = () => {
  const [withdrawalModal, setWithdrawModal] = useState(false);
  const [sendMoneyModal, setSendMoneyModal] = useState(false);

  const [addWalletAmountModal, setAddWalletAmountModal] = useState(false);

  const closeWithdrawModal = () => {
    setWithdrawModal(false);
  };

  const closeSendMoneyModal = () => {
    setSendMoneyModal(false);
  };

  const closeAddWalletAmountModal = () => {
    setAddWalletAmountModal(false);
  };

  const wallet = useSelector((state) => state.wallet.walletData);
  const transactions = useSelector((state) => state.transaction.allTransaction);

  return (
    <div>
      <div className="flex flex-col justify-center  lg:flex-row">
        <ProfileNavBar className="w-1/5 mb-8" />
        <div className="w-full lg:w-4/5 ml-5">
          <div className="bg-[#F3D9DC] dark:!bg-gray-900 dark:!text-gray-400 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-8">
            {wallet.data.user_wallet != null ? (
              <>
                <BalanceCard
                  title="WALLET BALANCE"
                  Icon={ImBook}
                  balance={wallet?.data?.user_wallet.remaining_formatted}
                />
                <BalanceCard
                  title="PRO BALANCE"
                  Icon={TbCurrencyNaira}
                  balance={"₦" + wallet.data?.user_wallet.pro_balance}
                />
                <BalanceCard
                  title="REFERRAL BALANCE"
                  Icon={TbCurrencyNaira}
                  balance={wallet.data?.user_wallet.referral_amount_formatted}
                />
              </>
            ) : null}

            <div className="flex-col justify-between p-3 space-y-2">
              <div
                className="cursor-pointer rounded-full h-8 bg-white dark:!bg-gray-900 dark:!text-gray-400 row-container"
                onClick={() => setAddWalletAmountModal(true)}
              >
                <p className="text-sm font-semibold">Add Wallet Amount</p>
              </div>
              <div
                className="cursor-pointer rounded-full h-8 bg-white dark:!bg-gray-900 dark:!text-gray-400 row-container"
                onClick={() => setWithdrawModal(true)}
              >
                <p className="text-sm font-semibold">Withdraw</p>
              </div>
              <div
                className="cursor-pointer rounded-full h-8 bg-white dark:!bg-gray-900 dark:!text-gray-400 row-container"
                onClick={() => setSendMoneyModal(true)}
              >
                <p className="text-sm font-semibold">Send Money</p>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto my-5">
            <h2 className="text-xl text-gray-400 font-medium">TRANSACTIONS</h2>
            {transactions.data.history.length > 0 ? (
              <div className="flex flex-col my-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:!bg-gray-900 dark:!text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Date</th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Status</th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Amount</th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Charge</th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Type</th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Other</th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >Ref</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:!bg-gray-900 dark:!text-gray-400 divide-y divide-gray-200 ">
                          {transactions.data.history.map((transaction, i) => (
                            <tr key={i}>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.paid_date}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.status_formatted}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.paid_amount_formatted}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                Service fee:{" "}
                                {transaction.admin_amount_formatted}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                <span className="capitalize">
                                  {transaction.payment_type}
                                </span>
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                From :{" "}
                                {transaction.received_from_username
                                  ? transaction.received_from_username
                                  : "-"}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.payment_id}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
      <SendMoneyModal
        SendMoneyModal={sendMoneyModal}
        closeSendMoneyModal={closeSendMoneyModal}
        payments={wallet}
      />
      <WithdrawModal
        withdrawModal={withdrawalModal}
        closeWithdrawModal={closeWithdrawModal}
        payments={wallet}
      />
      <AddWalletAmountModal
        addWalletAmountModal={addWalletAmountModal}
        closeAddWalletAmountModal={closeAddWalletAmountModal}
        payments={wallet}
      />
    </div>
  );
};

export default Wallet;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const userAgent = req.headers["user-agent"];
      const {
        isAndroid,
        isIOS,
        isWindows,
        isMacOs,
        mobileModel,
        browserName,
        osName,
        mobileVendor,
        browserVersion,
      } = getSelectorsByUserAgent(userAgent);

      var device_model = "";
      if (isAndroid == true) {
        device_model = mobileModel;
      } else if (isIOS == true) {
        device_model = mobileModel;
      } else {
        device_model = browserName + " " + browserVersion;
        // device_model = "Chrome" + " " + "100";
      }

      const cookies = getCookies({ req, res });

      store.dispatch(
        fetchWalletDetailsStart({
          accessToken: cookies.accessToken,
        })
      );

      store.dispatch(
        fetchAllTransactionStart({
          accessToken: cookies.accessToken,
        })
      );

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
      };
    }
);
