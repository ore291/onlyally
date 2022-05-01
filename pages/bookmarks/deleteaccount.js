import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function DeleteAccount() {
  return (
    <>
      <div className="flex">
        <ProfileNavItem />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <section className="w-2/3 mx-auto space-y-8 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Delete Password
            </h1>

            <div className="text-center space-y-2 mb-8">
              <h1 className="font-bold uppercase text-base">
                Hope, see you soon
              </h1>
              <p className="font-medium">
                Note: Once you delete your account, you will lose your account
                and wishlist details
              </p>
            </div>

            <form action="" className="text-gray-600 space-y-8 my">
              <div>
                <label htmlFor="" className="uppercase mb-6">
                  Password
                </label>
                <input
                  className="w-full border-0 mt-4 border-b-2 border-gray-300 focus:border-0 outline-none"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>

              <div className="text-center">
                <button className="btn bg-red-600 uppercase text-base rounded-lg px-8 py-4">
                  Delete Password
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
