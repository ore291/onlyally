import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import {MdOutlineGroups} from "react-icons/md"
import {BsYoutube} from "react-icons/bs";

const CreateButton = () => {
    const router = useRouter();
    const handleCreate = () => {

    }
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                group  hover:text-opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 align-middle`}
          >
            <div
              className={`justify-start p-1 pl-2 space-x-4 cursor-pointer row-container  w-40 h-10 ml-5 text-white   ${
                open ? "bg-lightPlayRed/30" : "bg-lightPlayRed"
              }  rounded-full`}
            >
              <FiPlus className={`h-6 w-6 ${open ? "rotate-45" : ""}`} />{" "}
              <p className="text-lg font-medium">Create</p>
            </div>
          </Popover.Button>
          {open && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterhref="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leavehref="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute z-10 w-[250px] lg:w-[18vw]  mt-3 transform drop-shadow-2xl right-4 lg:translate-x-1/2 sm:px-0 lg:max-w-3xl rounded-xl"
              >
                <div className="overflow-hidden  ">
                  <div className="relative grid gap-y-2 bg-white p-4  grid-cols-1">
                    <div className=" group flex  items-center space-x-2 cursor-pointer bg-white">
                     <MdOutlineGroups className="w-6 h-6 group-hover:text-lightPlayRed"/>
                      <span className="text-xs font-semibold tracking-wide group-hover:text-lightPlayRed">Create New Group</span>
                    </div>
                    <div className="group flex items-center space-x-2 cursor-pointer bg-white">
                     <BsYoutube className="w-6 h-6 group-hover:text-lightPlayRed"/>
                      <span className="text-xs font-semibold tracking-wide group-hover:text-lightPlayRed">Create New Channel</span>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          )}
        </>
      )}
    </Popover>
  );
};

export default CreateButton;
