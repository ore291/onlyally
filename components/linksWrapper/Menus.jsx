import React from "react";
import { Menu } from "@headlessui/react";
import { GrShieldSecurity } from "react-icons/gr";
import { FaLock } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { IoDocuments } from "react-icons/io5";
import Link from "next/link";

export default function MenuContainer({
  color,
  mainLink,
  subLinkOne,
  subLinkTwo,
  subLinkThree,
}) {
  return (
    <>
      <Menu>
        <Menu.Button>
          <span
            className="flex space-x-5 cursor-pointer font-semibold"
            style={{ color: color }}
          >
            <GrShieldSecurity className="mt-1 font-semibold" />
            <p>Security</p>
          </span>
        </Menu.Button>
        <Menu.Items>
          <div className="flex flex-col items-center uppercase text-xs gap-4 cursor-pointer text-gray-600">
            <Menu.Item>
              <Link
                className="hover:bg-red-400 text-white p-1 transition duration-150 rounded-sm ease-in-out shadow-sm"
                href="/bookmarks/auth2"
              >
                <span className="flex gap-2">
                  <FaLock />
                  Two Step Authetication
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="bg-red-400 text-white p-1 transition duration-150 rounded-sm ease-in-out shadow-sm"
                href="/bookmarks/security"
              >
                <span className="flex gap-2">
                  <AiFillSetting size="15px" />
                  Availability Status
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="bg-red-400 text-white p-1 transition duration-150 rounded-sm ease-in-out shadow-sm"
                href="/bookmarks/documents"
              >
                <span className="flex gap-2">
                  <IoDocuments size="15px" />
                  Document
                </span>
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
}
