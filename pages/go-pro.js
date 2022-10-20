import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCrown, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GoProStar, GoProFire, GoProFlash } from "../components/gopro/Plans";
import ProfileNavItem from "../components/ProfileNavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostSuggestionsStart } from "../store/slices/homeSlice";
import StorySliderLoader from "../components/feeds/StorySliderLoader";
import Link from "next/link";
import Image from "next/image";

export default function Auth2() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostSuggestionsStart());
  }, []);

  const postSug = useSelector((state) => state.home.postSug);

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
      name: "Pro features give you complete control over your profile",
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
        <div className="w-full  lg:mr-6 lg:ml-10 bg-white dark:!bg-gray-900 dark:!text-gray-400 mx-auto mt-10 shadow rounded-md space-y-8">
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

            {postSug.loading ? (
              <div className="max-w-4xl mx-auto  overflow-x-scroll scrollbar-thin flex-shrink-0">
                <StorySliderLoader />{" "}
              </div>
            ) : (
              <div className="grid gap-y-4 justify-center grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 items-center space-x-4 mt-10 bg-white dark:!bg-gray-900 dark:!text-gray-400 overflow-x-scroll scrollbar-thin scroll-smooth">
                {postSug.data.users.length > 0 &&
                  postSug.data.users.map((user, i) => (
                    <Link href={`/${user.username}`} passHref key={i}>
                      <div className="flex flex-col items-center justify-center flex-shrink-0 ">
                        <Image
                          src={user.picture}
                          alt="image"
                          width={100}
                          height={100}
                          objectFit="cover"
                          className="rounded-full  object-cover"
                        />
                        <p className="capitalize">{user.name}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </section>

          <section>
            <h1 className="capitalize font-medium text-center mb-8 bg-white dark:!bg-gray-900 dark:!text-gray-400">
              upgrade to premium creator
            </h1>
          </section>

          <main className="bg-gray-100 py-6 block lg:flex justify-center gap-16 dark:!bg-gray-900 dark:!text-gray-400">
            <GoProStar />
            <GoProFire />
            <GoProFlash />
          </main>
        </div>
      </div>
    </>
  );
}
