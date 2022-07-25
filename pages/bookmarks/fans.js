import React, { useState, useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineStar,
} from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsBoxArrowRight } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ProfileNavItem from "../../components/ProfileNavBar";
import {
  fetchActiveFollowersStart,
  fetchExpiredFollowersStart,
  fetchFollowersStart,
} from "../../store/slices/followerSlice";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveFollowersStart());
  }, []);

  const activeFollowers = useSelector((state) => state.follow.activeFollowers);
  const data = activeFollowers.data;
  console.log(data);
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row ">
        <ProfileNavItem color="red" />

        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="space-y-2  p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Fans</h1>
            </div>
          </section>

          <div className="border-b-2 pb-2 block lg:flex items-center gap-4">
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
            <h3 className="font-medium">{activeFollowers.data.total} ALL</h3>

            <div className="h-96 lg:h-fit grid lg:grid-cols-3">
              {activeFollowers.loading ? (
                <h1>Loading ...</h1>
              ) : (
                activeFollowers.data.followers.map((EachUser) => (
                  <article
                    className="w-full lg:w-11/12 h-fit mt-4 border-2 rounded-lg"
                    key={Math.random() * 1}
                  >
                    <div
                      style={{
                        background: `url(
                          ${EachUser.cover}
                        )`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      className=" h-24 flex justify-end items-end rounded-t-md"
                    >
                      <p className="text-white text-3xl">...</p>
                    </div>

                    <section className="flex justify-between ">
                      <img
                        width="100px"
                        src={EachUser.picture}
                        className="rounded-full mt-[-50px] ml-2"
                        alt="Placeholder"
                      />
                      <div>
                        <h2 className="text-xl">{EachUser.name}</h2>
                        <p className="text-[#ccc]">{EachUser.caption}</p>
                      </div>
                      <BsBoxArrowRight
                        style={{
                          color: "rgb(0,50,200",
                          marginTop: "20px",
                          marginRight: "20px",
                          border: "1px solid rgba(0, 0, 0, .4)",
                          padding: "6px",
                          borderRadius: "50px",
                          zIndex: "1000",
                        }}
                        size="35px"
                      />
                    </section>

                    <div className="pb-4 ">
                      <section className=" hover:animate-pulse cursor-pointer my-4 w-fit bg-gray-100 rounded-full ml-8 lg:ml-4 p-1 flex gap-4 items-center">
                        <AiOutlineStar />
                        Add to Favorites
                      </section>
                      <div className="text-center">
                        <button className="hover:bg-gradient-to-t active:bg-gradient-to-l relative bg-gradient-to-r from-purple-500 to-pink-500 uppercase text-base  rounded-full w-10/12 h-8">
                          <AiOutlineDollarCircle className="absolute left-2 mt-1" />
                          Tip
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
