import React, { useState } from "react";
import Image from "next/image";
import ProfileNavItem from "../../components/ProfileNavBar";
import Switch from "react-switch";

export default function Auth2() {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <>
      <div className="flex">
        <ProfileNavItem color="red" />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <section className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Two Step Authetication
            </h1>
            <div className="justify-center gap-8 text-center flex items-start">
              <Image
                src="/images/settings/twostep.svg"
                alt="two-step"
                width="300px"
                height="200px"
              />
              <div className="flex gap-4">
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  onColor="#DC2626"
                />
                <p className="font-medium">{checked ? "Enable" : "Disable"} </p>
              </div>
            </div>

            <form>
              <label className="font-medium">Password</label>
              <input type="password" className="input-form bg-white" />
            </form>
            <div className="text-center">
              <button className="btn bg-red-600 uppercase text-base rounded-lg">
                Submit
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
