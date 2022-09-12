import Image from "next/image";
import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";
import NoDataFound from "../NoDataFound/NoDataFound";
import { useSelector, useDispatch } from "react-redux";
import CancelWithdrawModal from "./CancelWithdrawModal";

function MyPaymentBody() {
  const sentPayments = useSelector((state) => state.transaction.sentPayTrans);
  const withDrawRequest = useSelector((state) => state.withdraw.withDrawals);

  const [data, setData] = useState("");
  const [cancelWithdrawModal, setCancelWithdrawModal] = useState(false);
  const closeCancelWithdrawModal = () => {
    setCancelWithdrawModal(false);
    setIsLoading(false);
  };

  const showCancelWithdrawModel = (event, data) => {
    setCancelWithdrawModal(true);
    setData(data);
    setIsLoading(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mt-2">
      <Tab.Group>
        <Tab.List className="space-x-2">
          <Tab >
            {({ selected }) => (
              <div
                className={`
                p-2 rounded-md
                  ${
                    selected
                      ? "bg-textPlayRed text-white"
                      : "bg-gray-200 text-black"
                  }`}
              >
                Transactions
              </div>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <div
                className={`
                p-2 rounded-md
                  ${
                    selected
                      ? "bg-textPlayRed text-white"
                      : "bg-gray-200 text-black"
                  }`}
              >
                Withdraws
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {sentPayments.data.history.length > 0 ? (
              <div className="flex flex-col my-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Paid To
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Message
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Service Fee
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                          {sentPayments.data.history.map((transaction, i) => (
                            <tr key={i}>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.username}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.paid_date}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.paid_amount_formatted}
                              </td>
                              <td className="px-2 text-sm  font-medium capitalize py-2 whitespace-nowrap">
                                {transaction.usage_type}
                              </td>
                              <td className="px-2 text-xs  font-medium py-2 whitespace-nowrap">
                                {transaction.message}
                              </td>
                              <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                {transaction.admin_amount_formatted}
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
          </Tab.Panel>
          <Tab.Panel>
            {withDrawRequest.data.history.length > 0 ? (
              <div className="flex flex-col my-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 outline-none ">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Transaction ID
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Billing Account
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Requested
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Paid
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-center text-xs font-medium text-lightPlayRed uppercase tracking-wider whitespace-nowrap"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                          {withDrawRequest.data.history.map(
                            (transaction, i) => (
                              <tr key={i}>
                                <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                  {transaction.created}
                                </td>
                                <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                  {transaction.user_withdrawal_unique_id}
                                </td>
                                <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                  {transaction.billing_account_name}
                                </td>
                                <td className="px-2 text-sm  font-medium capitalize py-2 whitespace-nowrap">
                                  {transaction.requested_amount_formatted}
                                </td>
                                <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                  {transaction.paid_amount_formatted}
                                </td>
                                <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                  {transaction.status_formatted}
                                </td>
                                <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                                  {transaction.cancel_btn_status == 1 ? (
                                    <button
                                      onClick={(event) =>
                                        showCancelWithdrawModel(
                                          event,
                                          transaction
                                        )
                                      }
                                      className="rounded p-2 bg-lightPlayRed text-white text-xs"
                                    >
                                      cancel
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NoDataFound />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <CancelWithdrawModal
        closeCancelWithdrawModal={closeCancelWithdrawModal}
        cancelWithdrawModal={cancelWithdrawModal}
        data={data}
        loading={isLoading}
      />
    </div>
  );
}

export default MyPaymentBody;
