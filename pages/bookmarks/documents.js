import React from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function Documents() {
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <h1 className="text-red-500 text-base font-semibold pb-12">
            Your ID Verification has been approved
          </h1>
          <div className="space-y-12">
            <div>
              <label htmlFor="">Enter Passport</label>
              <input type="file" className="input-form" />
            </div>
            <div>
              <label htmlFor="">Enter Driver License</label>
              <input type="file" className="input-form" />
            </div>
            <button className="btn bg-red-600 uppercase text-base rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
