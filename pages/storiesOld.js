import React, { useState } from "react";
import ProfileNavItem from "../components/ProfileNavBar";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoCalendar } from "react-icons/go";

const Story = () => {
  return (
    <>
      <section className="w-full lg:w-1/3 ">
        <div className="bg-[url('/images/settings/sec1.jpg')] bg-center bg-cover bg-no-repeat h-40 text-white flex justify-end items-end">
          <span className="bg-red-500 hover:bg-red-600 p-2 m-1 rounded-sm">
            3.50
          </span>
        </div>

        <div className="bg-white py-4 px-2 space-y-4">
          <section className="flex items-center ">
            <article className="flex gap-2 items-center text-sm">
              <img
                src="/images/settings/pic.jpg"
                alt="icon"
                className="w-1/6 rounded-full"
              />
              <div>
                <p>Bella</p>
                <p>1 hour ago Approved</p>
              </div>
            </article>

            <article>
              <RiDeleteBinLine size="22px" />
            </article>
          </section>

          <div>
            <p className="text-gray-400 flex items-center">
              1.8M views <GoCalendar className="mx-1" /> 11 months ago
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default function Stories() {
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <ProfileNavItem storiesColor={"#B30D28"} />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <div className="block lg:flex gap-4">
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
          <div className="block lg:flex gap-4">
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
        </div>
      </div>
    </>
  );
}
