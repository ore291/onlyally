import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCrown, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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

  const payout = [
    {
      name: "Profile Privacy",
      value: true,
    },
    {
      name: "Create Channel",
      value: true,
    },
    {
      name: "Create Channel",
      value: true,
    },
    {
      name: "Create Group",
      value: false,
    },
    {
      name: "Featured Member",
      value: false,
    },
    {
      name: "See profile visitors",
      value: false,
    },
    {
      name: "See profile visitors",
      value: false,
    },
    {
      name: "Show / Hide last seen",
      value: false,
    },
    {
      name: "Verified badge",
      value: false,
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white mx-auto mt-20 shadow rounded-md space-y-8">
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
                <section className="space-y-4">
                  <div
                    key={eachFeature.name}
                    className="flex items-center gap-2"
                  >
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

          <section className="px-4">
            <div className="flex gap-2 items-center">
              <span>
                <FaCrown className="text-orange-500 text-3xl" />
              </span>
              <h1>Premium Members</h1>
            </div>

            <div className="flex gap-2">
              {user.map((eachUser) => (
                <div>
                  <img
                    src={eachUser.pic}
                    key={eachUser.pic}
                    alt="image"
                    className="rounded-2xl w-32"
                  />
                  <p className="text-center">Lekan Dar</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h1 className="capitalize font-medium text-center mb-8">
              upgrade to premium creator
            </h1>

            <div className="flex gap-4">
              <main className="bg-gray-200 rounded-md shadow-md px-4 py-2">
                <div>
                  <img src="/images/settings/Green-Star.png" alt="Star" />
                  <h1 className="font-medium">Star</h1>
                  <h1 className="font-medium">Minimum Requirement</h1>
                  <h2>
                    100/ <span>Followers</span>
                  </h2>
                  <button className="bg-red-300 hover:bg-red-400 rounded-md shadow-lg text-red-600 capitalizes px-4 py-2">
                    upgrade now
                  </button>
                </div>

                <div className="space-y-2">
                  <h6>Payout is 55% of all earnings</h6>

                  {payout.map((pay) => (
                    <article className="flex gap-2 items-center">
                      <span>
                        {pay.value ? (
                          <FaCheckCircle className="text-red-500" />
                        ) : (
                          <FaTimesCircle className="text-gray-400" />
                        )}
                      </span>
                      <span className="font-medium text-gray-600">
                        {pay.name}
                      </span>
                    </article>
                  ))}
                </div>
              </main>

              <main className="bg-gray-200 rounded-md shadow-md px-4 py-2">
                <div>
                  <img src="/images/settings/Green-Star.png" alt="Star" />
                  <h1 className="font-medium">Star</h1>
                  <h1 className="font-medium">Minimum Requirement</h1>
                  <h2>
                    100/ <span>Followers</span>
                  </h2>
                  <button className="bg-red-300 hover:bg-red-400 rounded-md shadow-lg text-red-600 capitalizes px-4 py-2">
                    upgrade now
                  </button>
                </div>

                <div className="space-y-2">
                  <h6>Payout is 55% of all earnings</h6>

                  {payout.map((pay) => (
                    <article className="flex gap-2 items-center">
                      <span>
                        {pay.value ? (
                          <FaCheckCircle className="text-red-500" />
                        ) : (
                          <FaTimesCircle className="text-gray-400" />
                        )}
                      </span>
                      <span className="font-medium text-gray-600">
                        {pay.name}
                      </span>
                    </article>
                  ))}
                </div>
              </main>

              <main className="bg-gray-200 rounded-md shadow-md px-4 py-2">
                <div>
                  <img src="/images/settings/Green-Star.png" alt="Star" />
                  <h1 className="font-medium">Star</h1>
                  <h1 className="font-medium">Minimum Requirement</h1>
                  <h2>
                    100/ <span>Followers</span>
                  </h2>
                  <button className="bg-red-300 hover:bg-red-400 rounded-md shadow-lg text-red-600 capitalizes px-4 py-2">
                    upgrade now
                  </button>
                </div>

                <div className="space-y-2">
                  <h6>Payout is 55% of all earnings</h6>

                  {payout.map((pay) => (
                    <article className="flex gap-2 items-center">
                      <span>
                        {pay.value ? (
                          <FaCheckCircle className="text-red-500" />
                        ) : (
                          <FaTimesCircle className="text-gray-400" />
                        )}
                      </span>
                      <span className="font-medium text-gray-600">
                        {pay.name}
                      </span>
                    </article>
                  ))}
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
