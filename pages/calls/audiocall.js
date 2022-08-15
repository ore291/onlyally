import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import { FaArrowLeft } from "react-icons/fa";

export default function AudioCalls() {
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="bg-red-100 space-y-2  p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Audio call history</h1>
            </div>
            <p>
              The list contains the call request which is made by you, it will
              contain the request you received from other users
            </p>
          </section>
          <div className="w-[95%] px-4 mt-8 mx-auto shadow-md py-4">
            <table className="text-center space-y-4">
              <thead>
                <tr className="border-b-2">
                  <th>S.NO</th>
                  <th>MODEL</th>
                  <th>USER</th>
                  <th>AMOUNT</th>
                  <th>SCHEDULED AT</th>
                  <th>END TIME</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody className="space-y-4">
                <tr className="my-4">
                  <td>1</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                  <td className="text-white">
                    <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                      Start Call
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                </tr>

                <tr>
                  <td>3</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                </tr>

                <tr>
                  <td>4</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                  <td className="text-white">
                    <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-2 py-2">
                      Start Call
                    </div>
                  </td>{" "}
                </tr>

                <tr>
                  <td>5</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                  <td className="text-white">
                    <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                      Start Call
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>6</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                  <td className="text-white"></td>
                </tr>

                <tr>
                  <td>7</td>
                  <td className="text-blue-400">Bella</td>
                  <td className="text-blue-400">Test5</td>
                  <td>$0.00</td>
                  <td>31 Mar 2022. 03:40pm</td>
                  <td>-</td>
                  <td>Request Sent</td>
                  <td className="text-white">
                    <div className="bg-green-500 shadow-md hover:bg-green-600 mb-2 px-4 py-2">
                      Start Call
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
