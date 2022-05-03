import React from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function Documents() {
  return (
    <>
      <div className="flex">
        <ProSidebar className=" mt-20">
          <Menu iconShape="square">
            <MenuItem>Dashboard</MenuItem>
            <SubMenu title="Components" icon={<FaHeart />}>
              <MenuItem>
                <Link href="/bookmarks/referrals">Page Route</Link>
              </MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar>{" "}
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <h1 className="text-red-500 text-base font-semibold pb-12">
            Your ID Verification has been approved
          </h1>
          <div className="space-y-12">
            <div>
              <label htmlFor="">Enter Passport</label>
              <input type="file" className="input-form" />
            </div>
            <div>
              <label htmlFor="">Enter Driver License</label>
              <input type="file" className="input-form" />
            </div>
            <button className="btn bg-red-600 uppercase text-base rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
