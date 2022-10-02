import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCrown, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GoProStar, GoProFire, GoProFlash } from "../components/gopro/Plans";
import ProfileNavItem from "../components/ProfileNavBar";

export default function Auth2() {
  const user = [
    {
      pic: "/images/settings/covergirl.jpg",
    },
    {
      pic: "/images/settings/covergirl.jpg",
    },
    {
      pic: "/images/settings/covergirl.jpg",
    },
    {
      pic: "/images/settings/covergirl.jpg",
    },
    {
      pic: "/images/settings/covergirl.jpg",
    },
    {
      pic: "/images/settings/covergirl.jpg",
    },
  ];

  const Features = [
    {
      name: "pro features give you complete control over your profile",
    },
    {
      name: "Become premium member and earn from your content",
    },
    {
      name: "create channels of your choice",
    },
    {
      name: "create fan groups",
    },
    {
      name: "featured member",
    },
    {
      name: "verified badge",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full  lg:mr-6 lg:ml-10 bg-white mx-auto mt-10 shadow rounded-md space-y-8">
          <div className="bg-[url('/images/settings/bluebg.png')] flex p-4 justify-between rounded-md bg-center items-center">
            <div>
              <span>
                <FaCrown className="text-orange-500 text-3xl" />
              </span>
              <h1 className="font-medium">
                Playjor!
                <span className="text-sm text-white bg-orange-500 p-1 rounded-md">
                  PRO
                </span>
              </h1>
              {Features.map((eachFeature) => (
                <section className="space-y-4" key={eachFeature.name}>
                  <div className="flex items-center gap-2">
                    <span>
                      <AiOutlineCheckCircle className="text-green-500 text-lg" />
                    </span>
                    <p className="font-medium">{eachFeature.name}</p>
                  </div>
                </section>
              ))}
            </div>

            <img
              src="/images/settings/rocket.svg"
              alt="image"
              className="w-1/3"
            />
          </div>

          <section className="px-4 bg-whites">
            <div className="flex gap-2 items-center">
              <span>
                <FaCrown className="text-orange-500 text-3xl" />
              </span>
              <h1>Premium Members</h1>
            </div>

            <div className="mt-10 grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-2  bg-white">
              {user.map((eachUser) => (
                <div key={eachUser.pic}>
                  <img
                    src={eachUser.pic}
                    alt="image"
                    className="rounded-full w-[100px] h-[100px]"
                  />
                  <p className="ml-4">Lekan Dar</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h1 className="capitalize font-medium text-center mb-8 bg-white">
              upgrade to premium creator
            </h1>
          </section>

          <main className="bg-gray-100 py-6 block lg:flex justify-center gap-16">
            <GoProStar />
            <GoProFire />
            <GoProFlash />
          </main>
        </div>
      </div>
    </>
  );
}
