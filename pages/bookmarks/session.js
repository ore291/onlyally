import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Session() {
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
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Session Management
            </h1>

            <div className="text-right">
              <button className="btn bg-red-200 text-red-700 rounded-md">
                Close All Sessions
              </button>
            </div>

            <main className="w-full">
              {sessions.map((EachSession) => (
                <section
                  key={EachSession.ipAddress}
                  className="shadow-md rounded-md px-4 py-6 space-y-2"
                >
                  <h4 className="font-bold">{EachSession.deviceName}</h4>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {EachSession.ipAddress}
                    </span>
                    <span className="text-red-500">{EachSession.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <button className="btn bg-green-600 rounded-lg">
                      Active
                    </button>
                    <button className="btn bg-red-600 rounded-lg">
                      Logout
                    </button>
                  </div>
                </section>
              ))}
            </main>
          </section>
        </div>
      </div>
    </>
  );
}
