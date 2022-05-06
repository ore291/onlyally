import React, { useState } from "react";
import Image from "next/image";
import ProfileNavItem from "../../components/ProfileNavBar";
import Switch from "react-switch";

export default function AudioCalls() {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <>
      <div className="flex">
        <ProfileNavItem color="red" />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <h1>Audio Page</h1>
        </div>
      </div>
    </>
  );
}
