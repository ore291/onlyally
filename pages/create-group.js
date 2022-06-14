import React from "react";
import SideNavLayout from "../components/SideNavLayout";

const CreateGroup = () => {
  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto p-5">
        <h1 className="text-3xl ml-2 font-semibold tracking-wide ">Groups</h1>
        <div className="my-10 bg-white rounded-lg shadow-md py-2 px-5 col-container">
          <div className="w-[90%] border-b pb-2">
            <div className="flex justify-start items-center space-x-1">
              <div className="p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="{16}"
                  height="{16}" 
                  viewBox="0 0 24 24"
                  className="bg-lightPlayRed text-white w-6 h-6 rounded-full p-1"
                >
                  <path
                    fill="currentColor"
                    d="M13 3V11H21V3H13M3 21H11V13H3V21M3 3V11H11V3H3M13 16H16V13H18V16H21V18H18V21H16V18H13V16Z"
                  />
                </svg>
              </div>

              <h2 className="text-sm font-medium">Create New Group</h2>
            </div>
          </div>
        </div>
      </div>
    </SideNavLayout>
  );
};

export default CreateGroup;
