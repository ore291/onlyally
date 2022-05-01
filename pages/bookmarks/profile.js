import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Profile() {
  return (
    <>
      <div className="flex">
        <ProfileNavItem />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <section className="w-2/3 mx-auto space-y-8 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Profile Page
            </h1>
          </section>
        </div>
      </div>
    </>
  );
}
