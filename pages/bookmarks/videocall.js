import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function VideoCall() {
  return (
    <>
      <div className="flex">
        <ProfileNavItem />
        <div className="w-4/5 bg-white mx-auto mt-20 mr-16 ml-6 shadow">
          <section className="bg-red-100 space-y-2 shadow-md p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Video call history</h1>
            </div>
            <p>
              The list contains the call request which is made by you, it will
              contain the request you received from other users
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
