import React from "react";
import {
  deleteBankAccountStart,
  getBankAccountStart,
  makeDefaultBankAccountStart,
} from "../store/slices/bankAccountSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getSelectorsByUserAgent,
  isMobileOnly,
  isMobile,
} from "react-device-detect";
import { getCookies } from "cookies-next";
import { END } from "redux-saga";
import { wrapper } from "../store";

import { AiOutlineArrowLeft } from "react-icons/ai";
import NoDataFound from "../components/NoDataFound/NoDataFound";

const Billing = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const bankAccount = useSelector((state) => state.bankAccount.bankAccount);

  return (
    <>
      <div className="h-40 bg-[#F3D9DC] w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 place-content-center p-5 md:py-10 gap-y-3">
            <div className="col-span-2  flex flex-col space-y-3 items-start">
              <div
                className="row-container space-x-2 cursor-pointer "
                onClick={() => router.back()}
              >
                <AiOutlineArrowLeft className=" w-6 h-6" />
                <h5 className="font-semibold text-lg">Billing Accounts</h5>
              </div>
              <p className="text-gray-400 text-sm font-medium">
                You earnings will be created based on the withdraw billing
                accounts. Please add proper information
              </p>
            </div>
            <div className="row-container">
              <div
                className="rounded-full bg-lightPlayRed  text-white px-10 cursor-pointer py-2 text-sm font-medium"
                onClick={() => router.push("/payment/addbank")}
              >
                Add New Account
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-full">
        {bankAccount.data.billing_accounts &&
        bankAccount.data.billing_accounts.length > 0 ? (
          <div className="max-w-6xl mx-auto my-5">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          first_name
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          last_name
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          Bank Name
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          account_number
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          bank_type
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          is_default
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {bankAccount.data.billing_accounts.map((accounts, i) => (
                        <tr key={accounts.user_billing_account_id}>
                          <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap capitalize">
                            {accounts.first_name ? accounts.first_name : "-"}
                          </td>
                          <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap capitalize">
                            {accounts.last_name ? accounts.last_name : "-"}
                          </td>
                          <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                            {accounts.route_number
                              ? accounts.route_number
                              : "-"}
                          </td>
                          <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                            {accounts.account_number
                              ? accounts.account_number
                              : "-"}
                          </td>
                          <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap">
                            {accounts.bank_type ? accounts.bank_type : "-"}
                          </td>
                          {accounts.is_default === 1 ? (
                            <td>
                              <div className="p-0.5 w-[50px] row-container bg-green-600 text-white rounded">
                                Yes
                              </div>
                            </td>
                          ) : (
                            <td>
                              <div className="p-0.5 w-[50px] row-container bg-red-600 text-white rounded">
                                No
                              </div>
                            </td>
                          )}
                          <td className="px-2 text-sm  font-medium py-2 whitespace-nowrap ">
                            {accounts.is_default === 0 ? (
                              <div
                                className="p-1 bg-blue-500 row-container text-white rounded cursor-pointer mb-1"
                                onClick={() =>
                                  dispatch(
                                    makeDefaultBankAccountStart({
                                      user_billing_account_id:
                                        accounts.user_billing_account_id,
                                    })
                                  )
                                }
                              >
                                Make Default
                              </div>
                            ) : null}{" "}
                            <div
                              className="p-1 bg-red-500 row-container text-white rounded cursor-pointer"
                              onClick={() => {
                                if (window.confirm("delete account?")) {
                                  dispatch(
                                    deleteBankAccountStart({
                                      user_billing_account_id:
                                        accounts.user_billing_account_id,
                                    })
                                  );
                                }
                              }}
                            >
                              Delete
                            </div>{" "}
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
    </>
  );
};

export default Billing;

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
        getBankAccountStart({
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
