import SideNavLayout from "../components/SideNavLayout";
import Notificationcard from "../components/notifications/NotificationCard";
import NotificationLoader from "../components/notifications/NotificationLoader";
import NoDataFound from "../components/NoDataFound/NoDataFound";
import { fetchNotificationsStart } from "../store/slices/AlertSlice";
import { MdArrowBack } from "react-icons/md";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { BsHeart, BsUnlock, BsCameraVideo } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const Notifications = () => {
  const notification = useSelector((state) => state.alert.notification);
  const notifications = useSelector(
    (state) => state.alert.notification.data.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationsStart());
  }, []);

  const changeSection = (index) => {
    switch (index) {
      case 0:
        dispatch(fetchNotificationsStart());
        break;
      case 1:
        dispatch(fetchNotificationsStart({ notification_type: "comment" }));
        break;
      case 2:
        dispatch(fetchNotificationsStart({ notification_type: "like" }));
        break;
      case 3:
        dispatch(fetchNotificationsStart({ notification_type: "follow" }));
        break;
      case 4:
        dispatch(fetchNotificationsStart({ notification_type: "tips" }));
        break;
      // case 5:
      //   dispatch(fetchNotificationsStart({ notification_type: "video-call" }));
      //   break;
      // case 6:
      //   dispatch(fetchNotificationsStart({ notification_type: "audio-call" }));
      //   break;
      default:
        dispatch(fetchNotificationsStart());
    }
  };

  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 dark:text-gray-400 p-5">
        <div className="w-full flex justify-start items-center mb-8">
          <MdArrowBack className="w-8 h-8" />
          <h2 className="text-2xl uppercase font-semibold">NOTIFICATIONS</h2>
        </div>
        <Tab.Group onChange={(index) => changeSection(index)}>
          <Tab.List>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-x-5 gap-x-0 gap-y-8 md:gap-y-0">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                <RiCheckboxMultipleLine className="w-6 h-6 dark:text-gray-400" />
                <h2 className="text-sm font-medium ">All</h2>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    " notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                <FaRegComment className="w-6 h-6 dark:text-gray-400" />
                <h2 className="text-sm font-medium ">COMMENTS</h2>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    " notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                <BsHeart className="w-6 h-6 dark:text-gray-400" />
                <h2 className="text-sm font-medium ">LIKED</h2>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    " notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                <BsUnlock className="w-6 h-6 dark:text-gray-400" />
                <h2 className="text-sm font-medium ">SUBSCRIBED</h2>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    " notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                {/* <AiOutlineDollarCircle className="w-6 h-6 " /> */}
                <Image
                  src="/tips.png"
                  width="24"
                  height="24"
                  objectFit="cover"
                  className="dark:invert"
                  alt=""
                />
                <h2 className="text-sm font-medium ">TIPPED</h2>
              </Tab>
              {/* <Tab
                className={({ selected }) =>
                  classNames(
                    " notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                <BsCameraVideo className="w-6 h-6 " />
                <h2 className="text-sm font-medium ">VIDEO CALLS</h2>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    " notification-nav ",
                    "focus:outline-none focus:ring-0 pb-3",
                    selected
                      ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                      : "text-gray-500"
                  )
                }
              >
                <BiMicrophone className="w-6 h-6 -mr-1 md:-mr-0" />
                <h2 className="text-sm font-medium ">AUDIO CALLS</h2>
              </Tab> */}
            </div>
          </Tab.List>

          {notification.loading ? (
            <NotificationLoader></NotificationLoader>
          ) : (
            <Tab.Panels className="mt-2">
              <Tab.Panel className={classNames("bg-white p-1 dark:bg-gray-900 dark:text-gray-400")}>
                <div className="p-2 grid grid-cols-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Notificationcard
                        key={index}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white p-1 dark:bg-gray-900 dark:text-gray-400")}>
                <div className="p-2 grid grid-cols-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Notificationcard
                        key={index}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white p-1 dark:bg-gray-900 dark:text-gray-400")}>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <Notificationcard key={index} notification={notification} />
                  ))
                ) : (
                  <NoDataFound />
                )}
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white p-1 dark:bg-gray-900 dark:text-gray-400")}>
                <div className="p-2 grid grid-cols-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Notificationcard
                        key={index}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white p-1 dark:bg-gray-900 dark:text-gray-400")}>
                <div className="p-2 grid grid-cols-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Notificationcard
                        key={index}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </Tab.Panel>
              {/* <Tab.Panel className={classNames("bg-white p-0 md:p-1")}>
                <div className="p-0 md:p-2 grid grid-cols-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Notificationcard
                        key={index}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white p-0 md:p-1")}>
                <div className="p-0 md:p-2 grid grid-cols-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Notificationcard
                        key={index}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </Tab.Panel> */}
            </Tab.Panels>
          )}
        </Tab.Group>
      </div>
    </SideNavLayout>
  );
};

export default Notifications;
