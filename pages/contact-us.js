import Image from "next/image";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ProfileNavItem from "../components/ProfileNavBar";

export default function Contact() {
  function onChange(value) {
    alerts("Captcha value:", value);
  }
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem helpColor={"#B30D28"} />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto mt-20 shadow py-4">
          <div>
            <p className="text-red-500 font-semibold">Contact us</p>
            <h1 className="font-semibold">
              Let us help you resolve your issue
            </h1>
            <Image
              src="/images/settings/multitask.svg"
              width="300px"
              height="300px"
            />
          </div>
          <form className="w-ful lg:w-1/3 space-y-4">
            <input
              type="text"
              className="input-form"
              placeholder="First Name"
            />

            <input type="text" className="input-form" placeholder="Last Name" />

            <input type="text" className="input-form" placeholder="Email" />

            <textarea
              type="text"
              className="input-textarea"
              placeholder="Message"
            />

            <ReCAPTCHA
              sitekey="6LcD8qofAAAAAPHhY4dFbjlNj1bxRGp0rj1Snm9u"
              onChange={onChange}
            />

            <div className="flex gap-2 items-center">
              <input type="checkbox" />
              <p className="text-xs capitalize">
                agree with Privacy Policy to receive communications
              </p>
            </div>

            <button
              type="submit"
              className="bg-red-400 py-1 rounded-sm shadow-md px-6 text-white hover:bg-red-800"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
