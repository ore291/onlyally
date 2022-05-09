import React, { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineStar,
} from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsBoxArrowRight } from "react-icons/bs";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Fan() {
  const user = [
    {
      name: "tehseen",
      caption: "tehseen.009",
    },
    {
      name: "tehseen",
      caption: "tehseen.009",
    },
    {
      name: "tehseen",
      caption: "tehseen.009",
    },
    {
      name: "tehseen",
      caption: "tehseen.009",
    },
  ];
  return (
    <>
      <div className="flex">
        <ProfileNavItem color="red" />

        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <section className="space-y-2  p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Fans</h1>
            </div>
          </section>

          <div className="border-b-2 pb-2 flex items-center gap-4">
            <article className="flex gap-2">
              <AiOutlineCheckCircle size="20px" />
              <p>Active</p>
            </article>
            <article className="flex gap-2">
              <AiOutlineWarning size="20px" />
              <p>Unsubscribed</p>
            </article>
            <article className="flex gap-2 border p-2 dotted">
              <MdOutlineLibraryAddCheck size="20px" />
              <p>ALL</p>
            </article>
          </div>
          <section className="my-4">
            <h3 className="font-medium">4 ALL</h3>

            <div className="flex justify-between flex-wrap">
              {user.map((EachUser) => (
                <article
                  className="w-1/3 border-2 border-grey-500 "
                  key={EachUser.name}
                >
                  <div className="bg-[url('/images/settings/grey.jpg')] h-32 flex justify-end items-end">
                    <p className="text-white text-3xl">...</p>
                  </div>

                  <section className="flex justify-between ">
                    <img
                      width="100px"
                      src="/images/settings/pic.jpg"
                      className="rounded-full mt-[-50px]"
                      alt="Placeholder"
                    />
                    <div>
                      <h2 className="text-2xl">{EachUser.name}</h2>
                      <p>{EachUser.caption}</p>
                    </div>
                    <BsBoxArrowRight size="22px" />
                  </section>

                  <div className="pb-4">
                    <section className="my-4 w-fit bg-gray-200 rounded-md p-1 flex gap-4 items-center">
                      <AiOutlineStar />
                      Remove from Favorites
                    </section>
                    <div className="text-center">
                      <button className="btn bg-red-600 uppercase text-base rounded-lg w-full">
                        Tip
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
