import React, { useState, useEffect } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import {
  fetchSessionManagementListStart,
  deleteSingleLoginSessionStart,
  deleteAllLoginSessionStart,
} from "../../store/slices/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Loading from "../../components/Loading";
export default function Session() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSessionManagementListStart());
  }, []);
  const Session = useSelector((state) => state.session.sessionList);
  const allSession = Session.data.session;
  console.log(allSession);
  const sessions = [
    {
      deviceName: "Xiaomi M2003J15SC, android",
      ipAddress: "106.51.64.23",
      date: "23 Mar 2022 04:57pm",
    },
    {
      deviceName: "Chrome 100. web",
      ipAddress: "106.51.64.23",
      date: "23 Mar 2022 04:57pm",
    },
    {
      deviceName: "Xiaomi M2003J15SC, android",
      ipAddress: "106.51.64.23",
      date: "23 Mar 2022 04:57pm",
    },
    {
      deviceName: "Xiaomi M2003J15SC, android",
      ipAddress: "106.51.64.23",
      date: "28 Mar 2022 02:37pm",
    },
  ];
  const logoutSession = (id) => {
    console.log(id);
    dispatch(deleteSingleLoginSessionStart({ user_login_session_id: id }));
    setTimeout(() => {
      dispatch(fetchSessionManagementListStart());
    }, 1000);
  };
  const logoutAllSession = () => {
    dispatch(deleteAllLoginSessionStart());
  };

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 dark:!bg-gray-900 dark:!text-gray-400 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Session Management
            </h1>

            <div className="text-right">
              <button
                onClick={logoutAllSession}
                className="btn bg-red-200 text-red-700 rounded-md"
              >
                Close All Sessions
              </button>
            </div>

            <main className="w-full">
              {Session.loading === "true" && <Loading />}
              {allSession?.map((EachSession) => (
                <section
                  key={EachSession.ip_address}
                  className="shadow-md rounded-md px-4 py-6 space-y-2"
                >
                  <h4 className="font-bold">{EachSession.device_model}</h4>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {EachSession.ip_address}
                    </span>
                    <span className="text-red-500">
                      {EachSession.last_session}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <button className="btn bg-green-600 rounded-lg">
                      {EachSession.is_current_session == 1
                        ? "Active"
                        : "Inactive"}
                    </button>
                    <button
                      onClick={() =>
                        logoutSession(EachSession.user_login_session_id)
                      }
                      className="btn bg-red-600 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </section>
              ))}
              {Session.total === 0 && <NoDataFound />}
            </main>
          </section>
        </div>
      </div>
    </>
  );
}
