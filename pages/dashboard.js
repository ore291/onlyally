import React, { useState, useEffect } from "react";
import Charts from "../components/Charts";
import ProfileNavItem from "../components/ProfileNavBar";
import { fetchContentCreatorDashboardStart } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../components/NoDataFound/NoDataFound";
import { useRouter } from "next/router";

const Card = ({ style, heading, price, image }) => {
  return (
    <section
      className="w-fit h-36 shadow-md rounded-md flex text-white dark:!text-gray-200 p-2 gap-6 items-center"
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
  const dispatch = useDispatch();
  const router = useRouter();
  const dashboardData = useSelector((state) => state.user.dashboard);

  useEffect(() => {
    dispatch(fetchContentCreatorDashboardStart());
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem dashboardColor={"#B30D28"} />
        <div className=" bg-white dark:bg-gray-900 dark:text-gray-400 mx-auto mt-10 mr-0 md:mr-16 ml-0 md:ml-6 shadow py-4 px-8 block lg:flex  gap-12 justify-between">
          <div className="block lg:flex gap-4 w-full lg:w-[66%] space-y-4">
            <section className="space-y-4">
              <Card
                style={{ backgroundColor: "#ffad01" }}
                heading="Total Revenue Amount"
                price={dashboardData.data.total_payments}
                image="/images/settings/Star.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Video Call Amount"
                price={dashboardData.data.video_call_payments}
                image="/images/settings/Green-Star.png"
              />

              <Card
                style={{ backgroundColor: "#2AB4B3" }}
                heading="Total Post"
                price={dashboardData.data.total_posts}
                image="/images/settings/book.png"
              />

              <Card
                style={{ backgroundColor: "#F1103C" }}
                heading="Total Subscription Amount"
                price={dashboardData.data.subscription_payments}
                image="/images/settings/heartStar.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Groups Revenue"
                price="₦260.00"
                image="/images/settings/Green-Star.png"
              />
            </section>
            <section className="space-y-4 mt-4 md:mt-0">
              <Card
                style={{ backgroundColor: "#F1103C" }}
                heading="Total Post Amount"
                price={dashboardData.data.post_payments}
                image="/images/settings/heartStar.png"
              />

              <Card
                style={{ backgroundColor: "#2AB4B3" }}
                heading="Total Audio Call Amount"
                price={dashboardData.data.audio_call_payments}
                image="/images/settings/TealStar.png"
              />

              <Card
                style={{ backgroundColor: "#60B93A" }}
                heading="Total Video Call Amount"
                price={dashboardData.data.video_call_payments}
                image="/images/settings/chart.png"
              />

              <Card
                style={{ backgroundColor: "#ffad01" }}
                heading="Total Tips Amount"
                price={dashboardData.data.user_tips}
                image="/images/settings/orangechart.png"
              />

              <Card
                style={{ backgroundColor: "#2AB4B3" }}
                heading="Total Channels Revenue"
                price="₦0.99"
                image="/images/settings/TealStar.png"
              />
            </section>
          </div>

          <section className="flex-1 space-y-12">
            <h1 className="mb-4">Recent Followers</h1>
            <div>
              <Charts data={dashboardData} />
            </div>

            <div className="space-y-2">
              {dashboardData.data?.followers?.length > 0 ? (
                dashboardData.data?.followers?.map((follower) => (
                  <section
                    onClick={() => router.push(`/${follower.u_unique_id}`)}
                    className="flex gap-4 border-b-2 border-gray-200 dark:border-gray-700 pb-4 cursor-pointer"
                    key={follower.u_id}
                  >
                    <img
                      src={follower.picture}
                      alt="person"
                      width="50px"
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{follower.name}</h4>
                      <p className="text-gray-400">{follower.username}</p>
                    </div>
                  </section>
                ))
              ) : (
                <NoDataFound></NoDataFound>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
