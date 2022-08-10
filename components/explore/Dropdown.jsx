import { Popover, Transition } from "@headlessui/react";
import { BiCaretDown } from "react-icons/bi";
import { Fragment } from "react";

export default function Dropdown({ children, name }) {
  return (
    <Popover className="relative w-full lg:w-auto">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                flex items-center justify-between  pr-2 pl-1  text-xs font-semibold   rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full lg:w-auto`}
          >
            <span>{name}</span>
            <BiCaretDown
              className="w-4 h-4 ml-auto lg:ml-1 lg:-mr-1"
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-[200px] lg:w-[12vw] max-w-xs bg-white mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-xl ">
              <div className="overflow-hidden rounded-lg shadow-2xl ring-2 ring-black ring-opacity-5 px-1 py-3">
                <div className="relative grid gap-3 bg-white px-2 lg:grid-cols-1">
                  {children}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
