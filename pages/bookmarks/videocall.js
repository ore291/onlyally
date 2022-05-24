import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function VideoCall() {
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="bg-red-100 space-y-2  p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Video call history</h1>
            </div>
            <p>
              The list contains the call request which is made by you, it will
              contain the request you received from other users
            </p>
          </section>
          <div className="w-[95%] px-4 mt-8 mx-auto shadow-md py-4">
            <table className="text-center w-full space-y-4">
              <tr className="border-b-2">
                <th>S.NO</th>
                <th>REQUESTED TO</th>
                <th>REQUESTED FROM</th>
                <th>AMOUNT</th>
                <th>SCHEDULED AT</th>
                <th>END TIME</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>

              <tr className="my-4">
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td className="text-blue-400">Bella</td>
                <td className="text-blue-400">Test5</td>
                <td>$0.00</td>
                <td>31 Mar 2022. 03:40pm</td>
                <td>-</td>
                <td>Call Request Received</td>
                <td className="text-white">
                  <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                    Accept
                  </div>
                  <div className="bg-red-500 shadow-md hover:bg-red-600  px-4 py-2">
                    Reject
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
