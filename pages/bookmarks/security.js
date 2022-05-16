import React from "react";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Security() {
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <ProfileNavItem color="red" />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Availability Status
            </h1>
            <p className="uppercase font-medium">ONLINE STATUS</p>
            <select className="w-full border-0 border-b-2 border-gray-300 focus:border-0 outline-none">
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
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
