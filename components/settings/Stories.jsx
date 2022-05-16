import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoCalendar } from "react-icons/go";
import ProfileNavItem from "../ProfileNavBar";

const Story = () => {
  return (
    <>
      <section className=" w-1/3 ">
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

const Stories = () => {
  return (
    <>
      <div className="flex">
        <ProfileNavItem />
        <div className="bg-[#F9F9F9] mx-auto mt-20 mr-16 ml-6 shadow py-4 space-y-8">
          <div className="flex gap-4">
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
          <div className="flex gap-4">
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stories;
