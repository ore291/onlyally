import React, { useState } from "react";
import Charts from "../components/Charts";
import ProfileNavItem from "../components/ProfileNavBar";

const Card = ({ style, heading, price, image }) => {
  return (
    <section
      className="w-fit h-36 shadow-md rounded-md flex text-white p-2 gap-6 items-center"
      style={style}
    >
      <img src={image} alt="icon" className="w-1/6" />

      <div>
        <h5 className="text-xl">{heading}</h5>
        <h1 className="font-medium">{price}</h1>
      </div>
    </section>
  );
};

export default function Dashboard() {
  const followers = [
    {
      name: "SUSHMA H G",
      handle: "@sush",
    },
    {
      name: "tehseen",
      handle: "tehseen.khan009",
    },
    {
      name: "PattySibea",
      handle: "PattySibea",
    },
  ];
  return (
    <>
      <div className="flex">
        <ProfileNavItem />
        <div className=" bg-white mx-auto mt-20 mr-16 ml-6 shadow py-4 px-8 flex  gap-12 justify-between">
          <div className="flex gap-4 w-[66%]">
            <section className="space-y-4">
              <Card
                style={{ backgroundColor: "#ffad01" }}
                heading="Total Revenue Amount"
                price="$44.88"
                image="/images/settings/Star.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Video Call Amount"
                price="$260.00"
                image="/images/settings/Green-Star.png"
              />

              <Card
                style={{ backgroundColor: "#ffad01" }}
                heading="Total Revenue Amount"
                price="$44.88"
                image="/images/settings/Star.png"
              />

              <Card
                style={{ backgroundColor: "#F1103C" }}
                heading="Total Subscription Amount"
                price="$39.98"
                image="/images/settings/heartStar.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Groups Revenue"
                price="$260.00"
                image="/images/settings/Green-Star.png"
              />
            </section>
            <section className="space-y-4">
              <Card
                style={{ backgroundColor: "#F1103C" }}
                heading="Total Post Amount"
                price="$4.00"
                image="/images/settings/heartStar.png"
              />

              <Card
                style={{ backgroundColor: "#2AB4B3" }}
                heading="Total Audio Call Amount"
                price="$0.99"
                image="/images/settings/TealStar.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Video Call Amount"
                price="$44.88"
                image="/images/settings/Green-Star.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Video Call Amount"
                price="$44.88"
                image="/images/settings/Green-Star.png"
              />

              <Card
                style={{ backgroundColor: "#2AB4B3" }}
                heading="Total Channels Revenue"
                price="$0.99"
                image="/images/settings/TealStar.png"
              />
            </section>
          </div>

          <section className="flex-1 space-y-12">
            <h1 className="mb-4">Recent Followers</h1>
            <div>
              <Charts />
            </div>

            <div className="space-y-2">
              {followers.map((eachFollow) => (
                <section
                  className="flex gap-4 border-b-2 border-gray-200 pb-4"
                  key={eachFollow.name}
                >
                  <img
                    src="/images/settings/pic.jpg"
                    alt="person"
                    width="50px"
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-medium">{eachFollow.name}</h4>
                    <p className="text-gray-400">{eachFollow.handle}</p>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
