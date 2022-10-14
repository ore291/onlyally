import { useState, useEffect } from "react";
import ProfileNavItem from "../components/ProfileNavBar";
import { MdPeopleAlt } from "react-icons/md";
import { BsShare } from "react-icons/bs";
import { getReferralStart } from "../store/slices/referalSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorLogoutCheck } from "../store/slices/errorSlice";
import Head from "next/head";
import { notify } from "reapop";
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";

export default function Referrals() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReferralStart());
  }, []);
  const [text, setText] = useState("");
  const Referals = useSelector((state) => state.referal.referralDetails.data);
  console.log(Referals);
  const copyText = () => {
    navigator.clipboard.writeText(Referals.referrals_signup_url);
    notify({ message: "copied", status: "error" });
    setText("copied");
    setTimeout(() => {
      setText("");
    }, 2000);
  };
  const logos = [
    {
      share: "EmailShareButton",
      id: 1,
      image: "/images/settings/p1.png",
      logoName: "Email",
    },
    {
      share: "WhatsappShareButton",
      id: 2,
      image: "/images/settings/p2.png",
      logoName: "Whatsapp",
    },
    {
      id: 3,
      share: "FacebookShareButton",
      image: "/images/settings/p3.png",
      logoName: "Facebook",
    },
    {
      id: 4,
      share: "TwitterShareButton",
      image: "/images/settings/p4.png",
      logoName: "Twitter",
    },
    {
      id: 6,
      share: "RedditShareButton",
      image: "/images/settings/p6.png",
      logoName: "Reddit",
    },
  ];

  const ReferralInfo = [
    {
      info: "No of Users Joined",
      number: `${Referals.total_referrals}`,
    },
    {
      info: "Referral Earnings",
      number: `${Referals.referral_earnings_formatted}`,
    },
    {
      info: "Refree Earnings",
      number: `${Referals.referee_earnings_formatted}`,
    },
    {
      info: "Total",
      number: `${Referals.total_formatted}`,
    },
    {
      info: "Used",
      number: `${Referals.used_formatted}`,
    },
    {
      info: "Remaining",
      number: `${Referals.remaining_formatted}`,
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
      <Head>
        <meta name="description" content={Referals.share_message} />
      </Head>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem referralsColor={"#B30D28"} />
        <div className="w-full lg:w-[95%] border-0 border-b-2 border-gray-300 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto mt-20 lg:mr-16 lg:ml-6 shadow py-4">
          <section className="flex justify-center">
            <MdPeopleAlt size={20} />
            <h4 className="font-bold mb-4">Tell your friends about Playjor </h4>
          </section>
          <div>
            <main className="px-6 shadow-lg py-4">
              <h4 className="text-center">
                Share this link so your friends can join the conversation around
                all your favorite Creators
              </h4>
              <section className="block lg:flex gap-4  items-center">
                <div className="flex p-4 justify-between border-dashed border-2 gap-2 items-center">
                  <p className="text-sm bg-gray-200 rounded-md py-2">
                    https://playjor.com/?referral=618e5f04c1558
                  </p>
                  <div>
                    <button
                      onClick={copyText}
                      className="btn bg-red-600 uppercase px-2 rounded-lg text-xs"
                    >
                      {text === "copied" ? text : "copy link"}
                    </button>
                  </div>
                </div>

                <div className="block lg:flex gap-6 space-y-4 lg:space-y-0 p-4">
                  <EmailShareButton
                    className=""
                    key={logos[0].id}
                    url={Referals.referrals_signup_url}
                    subject={"Playjor"}
                    body={Referals.share_message}
                  >
                    <section className=" hover:bg-gray-100 cursor-pointer shadow-md flex items-center justify-center flex-col rounded-md bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 py-2 text-center w-full lg:w-fit">
                      <img
                        src={logos[0].image}
                        alt="logo"
                        className="lg:w-[50px] w-[25px]"
                      />
                      <p className="font-bold text-sm">{logos[0].logoName}</p>
                    </section>
                  </EmailShareButton>
                  <WhatsappShareButton
                    key={logos[1].id}
                    url={` ${Referals.share_message} `}
                  >
                    <section className=" hover:bg-gray-100 cursor-pointer shadow-md flex items-center justify-center flex-col rounded-md bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 py-2 text-center w-full lg:w-fit">
                      <img
                        src={logos[1].image}
                        alt="logo"
                        className="lg:w-[50px] w-[25px]"
                      />
                      <p className="font-bold text-sm">{logos[1].logoName}</p>
                    </section>
                  </WhatsappShareButton>
                  <FacebookShareButton
                    url={`${Referals.referrals_signup_url}`}
                    hashtag={"#playjor"}
                  >
                    <section className=" hover:bg-gray-100 cursor-pointer shadow-md flex items-center justify-center flex-col rounded-md bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 py-2 text-center w-full lg:w-fit">
                      <img
                        src={logos[2].image}
                        alt="logo"
                        className="lg:w-[50px] w-[25px]"
                      />
                      <p className="font-bold text-sm">{logos[2].logoName}</p>
                    </section>
                  </FacebookShareButton>
                  <TwitterShareButton
                    key={logos[3].id}
                    url={Referals.share_message}
                  >
                    <section className=" hover:bg-gray-100 cursor-pointer shadow-md flex items-center justify-center flex-col rounded-md bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 py-2 text-center w-full lg:w-fit">
                      <img
                        src={logos[3].image}
                        alt="logo"
                        className="lg:w-[50px] w-[25px]"
                      />
                      <p className="font-bold text-sm">{logos[3].logoName}</p>
                    </section>
                  </TwitterShareButton>
                  <RedditShareButton
                    key={logos[4].id}
                    url={Referals.referrals_signup_url}
                    title={Referals.share_message}
                  >
                    <section className=" hover:bg-gray-100 cursor-pointer shadow-md flex items-center justify-center flex-col rounded-md bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 py-2 text-center w-full lg:w-fit">
                      <img
                        src={logos[4].image}
                        alt="logo"
                        className="lg:w-[50px] w-[25px]"
                      />
                      <p className="font-bold text-sm">{logos[4].logoName}</p>
                    </section>
                  </RedditShareButton>
                </div>
              </section>

              <div className="w-full lg:w-1/2 space-y-8 shadow-md bg-white dark:!bg-gray-900 dark:!text-gray-400 px-2 py-8 rounded-md">
                {ReferralInfo.map((EachInfo, index) => (
                  <article
                    key={index}
                    className="flex items-center justify-between border-dashed border-b-2"
                  >
                    <h4>{EachInfo.info}</h4>
                    <h5 className="font-bold cursor-pointer">
                      {EachInfo.number ? EachInfo.number : "Loading"}
                    </h5>
                  </article>
                ))}
              </div>
            </main>

            <div className="py-4">
              <h5 className="font-medium mb-4 cursor-pointer">How it Works</h5>
              <section className="block lg:flex justify-between gap-4 cursor-pointer">
                {steps.map((EachStep) => (
                  <div
                    key={EachStep.steps}
                    className=" mb-10 w-full lg:w-1/3 bg-[#B30D28] hover:opacity-70 rounded-md shadow-md py-4 px-2 flex gap-4 items-center"
                  >
                    <span>
                      <BsShare className="text-white " size={20} />
                    </span>
                    <div className="font-medium">
                      <h4 className="text-yellow-500 font-bold ">
                        {EachStep.steps}
                      </h4>
                      <p className="text-white">{EachStep.desc}</p>
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
