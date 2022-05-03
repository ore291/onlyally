import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";

export default function Profile() {
  return (
    <>
      <div className="flex">
        <ProfileNavItem />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 border-2 border-gray-500 rounded-md shadow py-4 space-y-12">
          <section className="space-y-2 ">
            <h1 className="font-semibold text-gray-400 uppercase">
              Edit Profile
            </h1>
            <p className="font-semibold text-gray-400  uppercase">
              Change Profile and Cover PHOTOS
            </p>

            <div className="shadow-md">
              <section className="bg-[url('/images/settings/covergirl.jpg')] h-48 rounded-md flex justify-end items-end pb-8 bg-cover bg-center px-4">
                <button className="btn px-4 py-2 bg-red-600 rounded-md">
                  Upload Cover
                </button>
              </section>

              <div className="pl-8 pr-2 pb-2">
                <img
                  width="100px"
                  className="rounded-full mt-[-50px]"
                  src="/images/settings/pic.jpg"
                  alt="profile-pic"
                />

                <section className="flex justify-end gap-4">
                  <button className="border-2 border-red-600 px-4 py-2 cursor-pointer text-lg rounded-lg shadow-md text-red-700 font-bold  hover:bg-red-500 hover:text-white transition duration-150 ">
                    Upload Feature Profile
                  </button>
                  <button className="border-2 border-red-600 px-4 py-2 cursor-pointer text-lg rounded-lg shadow-md text-red-700 font-bold hover:bg-red-500 hover:text-white transition duration-150 ">
                    Upload profile photo
                  </button>
                </section>
              </div>
            </div>
            <p className="font-semibold text-gray-400 text-sm ">
              Use 144px * 144px for profile and 1960 * 960px for cover picture.
              Accept .jpg .jpeg .png and .svg format images.
            </p>
          </section>

          <section className="flex gap-12 text-gray-500 mt-8">
            <article className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Birthday
                </label>
                <input
                  type="date"
                  placeholder="Enter Date"
                  className="border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Gender
                </label>
                <input
                  type="text"
                  placeholder="Enter Gender"
                  className="border-gray-500 rounded-md"
                />
              </div>
            </article>

            <article className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  User Category
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Phone
                </label>
                <input
                  type="number"
                  placeholder="Enter Phone"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  className="border-gray-500 rounded-md"
                />
              </div>
            </article>
          </section>

          <section className="space-y-4">
            <div>
              <span className="font-medium">
                Subscription Price (Per Month)
              </span>
              <div className="border-2 border-gray-400 rounded-md py-2 px-2">
                <h4>$29.95</h4>
              </div>
            </div>

            <div>
              <span className="font-medium">Subscription Price (1 year)</span>
              <div className="border-2 border-gray-400 rounded-md py-2 px-2">
                <h4>$69.99</h4>
              </div>
            </div>
          </section>

          <section className="text-grey-500 space-y-4">
            <div>
              <span className="uppercase font-medium">
                Video call amount(usd) optional
              </span>
              <input
                type="number"
                className="input-form bg-white"
                placeholder="0"
              />
              <span className="text-xs pl-8">
                Note: set price for the video call this amount will be paid by
                those requesting the video call
              </span>
            </div>

            <div>
              <span className="uppercase font-medium">
                Audio call amount(usd) optional
              </span>
              <input
                type="number"
                className="input-form bg-white"
                placeholder="0"
              />
              <span className="text-xs pl-8">
                Note: set price for the audio call this amount will be paid by
                those requesting the audio call
              </span>
            </div>

            <div>
              <span className="uppercase font-medium">
                default payment method optional
              </span>
              <select className="w-full border-0 border-b-2 border-gray-300 focus:border-0 outline-none">
                <option value="Online">Wallet</option>
                <option value="Offline">Card</option>
              </select>
              <span className="text-xs pl-8">
                Note: set price for the audio call this amount will be paid by
                those requesting the audio call
              </span>
            </div>
          </section>

          <section>
            <h1 className="font-semibold border-b-2 border-gray-300  text-gray-500 pb-4 ">
              Social Settings (optional)
            </h1>

            <div className="flex gap-8 my-8">
              <div className="w-full">
                <article className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Website
                    </label>
                    <input
                      type="text"
                      placeholder="Website"
                      className="border-gray-500 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Instagram
                    </label>
                    <input
                      type="text"
                      placeholder="Instagram Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Twitter
                    </label>
                    <input
                      type="text"
                      placeholder="Twitter Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Pinterest
                    </label>
                    <input
                      type="text"
                      placeholder="Pinterest Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Twitch
                    </label>
                    <input
                      type="text"
                      placeholder="Twitch Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Monthly Amount
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                </article>
              </div>

              <div className="w-full">
                <article className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Amazon Wishlist
                    </label>
                    <input
                      type="text"
                      placeholder="Amazon Wishlist"
                      className="border-gray-500 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Facebook
                    </label>
                    <input
                      type="text"
                      placeholder="Facebook Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      placeholder="LinkedIn Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Youtube
                    </label>
                    <input
                      type="text"
                      placeholder="Youtube Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Snapchat
                    </label>
                    <input
                      type="text"
                      placeholder="Snapchat Link"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Yearly Amount
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="border-gray-500 rounded-md"
                    />
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="bg-red-200 w-4/5 mx-auto shadow-md flex flex-col justify-center items-center rounded-md">
            <div className="text-center flex flex-col justify-center items-center space-y-2 py-4 px-2">
              <img
                width="100px"
                className="rounded-full "
                src="/images/settings/pic.jpg"
                alt="profile-pic"
              />
              <h1>Hot Member</h1>
              <h5 className="font-medium">Membership</h5>
              <button className="btn bg-red-600 uppercase text-base rounded-lg">
                Upgrade
              </button>
            </div>
          </section>

          <div className="text-center">
            <button className="btn bg-red-600 uppercase text-base rounded-lg px-8 py-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
