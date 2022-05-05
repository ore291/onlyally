import Image from "next/image";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Contact() {
  function onChange(value) {
    alerts("Captcha value:", value);
  }
  return (
    <>
      <div className="flex">
        <ProfileNavItem linkcolor="red" />
        <div className="settings">
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
          <form className="w-1/3 space-y-4">
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
