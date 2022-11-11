import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import GeneralSettings from "./GeneralSettings";
import PrivacySettings from "./PrivacySettings";
import DesignSettings from "./DesignSettings";
import MembersSettings from "./MembersSettings";
import DeleteSettings from "./DeleteSettings";
import AnalyticsSettings from "./AnalyticsSettings";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminSettings = ({ data }) => {
  let [categories] = useState([
    "General",
    "Privacy",
    "Design",
    "Members",
    "Analytics",
    "Requests",
    "Delete",
  ]);
  return (
    <div className="mt-10 md:mt-20 bg-white shadow-sm rounded-lg">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center my-5 ">Settings</h1>
      </div>
      <div>
        <Tab.Group>
          <div className="bg-white rounded-xl p-1 mb-10 md:mb-60">
            <Tab.List className="row-container flex-wrap md:flex-nowrap p-1 md:space-x-5 bg-[#ecf0f5]  rounded-full px-2 md:w-2/3 mx-auto">
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      "w-[70px] p-.5 text-sm leading-5 font-medium text-gray-700 m-1",
                      "focus:outline-none focus:ring-0 ",
                      selected
                        ? "bg-white rounded-full shadow-md"
                        : "text-gray-600"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2 max-w-[730px] mx-auto">
              {/* users tab */}
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <GeneralSettings />
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <PrivacySettings />
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <DesignSettings />
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <MembersSettings channel={data} />
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <AnalyticsSettings channel={data} />
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <MembersSettings channel={data} />
              </Tab.Panel>
              <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                <DeleteSettings channel={data} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AdminSettings;
