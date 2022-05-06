import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Auth2() {
  return (
    <>
      <div className="flex">
        <ProfileNavItem color="red" />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4"></div>
      </div>
    </>
  );
}
