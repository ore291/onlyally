import { useState, useEffect } from "react";
import ProfileNavItem from "../components/ProfileNavBar";
import { MdPeopleAlt } from "react-icons/md";
import { BsShare } from "react-icons/bs";
import { getReferralStart } from "../store/slices/referalSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
export default function Referrals() {
  const dispatch = useDispatch();

  dispatch(getReferralStart());

  const logos = [
    {
      id: 1,
      image: "/images/settings/p1.png",
      logoName: "Email",
    },
    {
      id: 2,
      image: "/images/settings/p2.png",
      logoName: "Whatsapp",
    },
    {
      id: 3,
      image: "/images/settings/p3.png",
      logoName: "Facebook",
    },
    {
      id: 4,
      image: "/images/settings/p4.png",
      logoName: "Twitter",
    },
    {
      id: 6,
      image: "/images/settings/p6.png",
      logoName: "Reddit",
    },
  ];

  const ReferralInfo = [
    {
      info: "No of Users Joined",
      number: 24,
    },
    {
      info: "Referral Earnings",
      number: "$240.00",
    },
    {
      info: "Refree Earnings",
      number: "$0.00",
    },
    {
      info: "Total",
      number: "$240.00",
    },
    {
      info: "Used",
      number: "$240.00",
    },
    {
      info: "Remaining",
      number: "$0.00",
    },
  ];

  const steps = [
    {
      icons: '<BsShare size="32px" />',
      steps: "Step 1",
      desc: "Share your link with friends by copying the link, or choose an icon",
    },
    {
      icons: '<BsShare size="32px" />',
      steps: "Step 2",
      desc: "We will let you know when a friend is notified",
    },
    {
      icons: '<BsShare size="32px" />',
      steps: "Step 3",
      desc: "You can share with as many friends and family as you like",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem referralsColor={"#B30D28"} />
        <div className="w-full lg:w-[95%] border-0 border-b-2 border-gray-300 bg-white px-4 mx-auto mt-20 lg:mr-16 lg:ml-6 shadow py-4">
          <section className="flex justify-center">
            <MdPeopleAlt size={20} />
            <h4 className="font-bold mb-4">Tell your friends about Playjor </h4>
          </section>
          <div>
            <main className="px-6 shadow-lg py-4">
              <h4>
                Share this link so your friends can join the conversation around
                all your favorite Creators
              </h4>
              <section className="block lg:flex gap-4  items-center">
                <div className="flex p-4 justify-between border-dashed border-2 gap-2 items-center">
                  <p className="text-sm bg-gray-200 rounded-md py-2">
                    https://playjor.com/?referral=618e5f04c1558
                  </p>
                  <div>
                    <button className="btn bg-red-600 uppercase px-2 rounded-lg text-xs">
                      Copy Link
                    </button>
                  </div>
                </div>

                <div className="block lg:flex gap-6 space-y-4 lg:space-y-0">
                  {logos.map((logo) => (
                    <section
                      key={logo.id}
                      className=" hover:bg-gray-100 cursor-pointer shadow-md flex items-center justify-center flex-col rounded-md bg-white px-4 py-2 text-center w-full lg:w-fit"
                    >
                      <img src={logo.image} alt="logo" width="50px" />
                      <p className="font-bold text-sm">{logo.logoName}</p>
                    </section>
                  ))}
                </div>
              </section>

              <div className="w-full lg:w-1/2 space-y-8 shadow-md bg-white px-2 py-8 rounded-md">
                {ReferralInfo.map((EachInfo, index) => (
                  <article
                    key={index}
                    className="flex items-center justify-between border-dashed border-b-2"
                  >
                    <h4>{EachInfo.info}</h4>
                    <h5 className="font-bold">{EachInfo.number}</h5>
                  </article>
                ))}
              </div>
            </main>

            <div className="py-4">
              <h5 className="font-medium mb-4">How it Works</h5>
              <section className="block lg:flex justify-between gap-4">
                {steps.map((EachStep) => (
                  <div
                    key={EachStep.steps}
                    className="w-full lg:w-1/3 bg-white rounded-md shadow-md py-4 px-2 flex gap-4 items-center"
                  >
                    <span>
                      <BsShare size={20} />
                    </span>
                    <div className="font-medium">
                      <h4>{EachStep.steps}</h4>
                      <p>{EachStep.desc}</p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
