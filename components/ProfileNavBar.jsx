/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GiSpeaker } from "react-icons/gi";
import { BiHistory, BiUserCircle } from "react-icons/bi";
import { BsBookmark, BsListStars } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { AiFillSetting, AiFillAudio } from "react-icons/ai";
import { IoDocuments } from "react-icons/io5";
import {
  MdWifiCalling,
  MdOutlinePayment,
  MdOutlineContactSupport,
} from "react-icons/md";
import { VscReferences } from "react-icons/vsc";
import { FaSuitcase, FaCartPlus, FaVideo, FaShoppingBag } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";
import { RiLockPasswordLine, RiDeleteBin5Line } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { IoVideocam } from "react-icons/io5";
import { IoIosPeople, IoMdPhotos } from "react-icons/io";
import { MdPassword } from "react-icons/md";

function ProfileNavItem({ linkcolor, securitycolor }) {
  return (
    <div className="mt-16 w-[20%] z-0">
      <div className="pr-7 py-7 block bg-white rounded shadow-sm">
        <ProSidebar>
          <Menu iconShape="circle" className="font-medium text-gray-600">
            <MenuItem
              icon={<RiBarChartHorizontalFill size="20px" />}
              className="text-gray-600"
            >
              <Link href="/bookmarks/referrals">Dashborad</Link>
            </MenuItem>

            <SubMenu title="Profile" icon={<BiUserCircle size="20px" />}>
              <div className="space-y-4">
                <MenuItem className="text-xs" icon={<ImProfile />}>
                  <Link href="/bookmarks/profile">My Profile</Link>
                </MenuItem>
                <MenuItem icon={<RiLockPasswordLine size="18px" />}>
                  <Link href="/bookmarks/password">Change Password</Link>
                </MenuItem>
                <MenuItem icon={<IoIosPeople size="18px" />}>
                  <Link href="/bookmarks/session">Session Management</Link>
                </MenuItem>
                <MenuItem icon={<RiDeleteBin5Line size="18px" />}>
                  <Link href="/bookmarks/deleteaccount">Delete Account</Link>
                </MenuItem>
              </div>
            </SubMenu>

            <MenuItem icon={<BiHistory size="20px" />}>
              <Link href="/bookmarks/referrals">Stories</Link>
            </MenuItem>

            <SubMenu title="Bookmarks" icon={<BsBookmark />}>
              <div className="space-y-4">
                <MenuItem className="text-xs" icon={<IoMdPhotos />}>
                  <Link href="/bookmarks/photos">Photos</Link>
                </MenuItem>
                <MenuItem className="text-xs" icon={<FaVideo />}>
                  <Link href="/bookmarks/videos">Videos</Link>
                </MenuItem>
                <MenuItem
                  className="text-xs"
                  icon={<AiFillAudio size="18px" />}
                >
                  <Link href="/bookmarks/videos">Audios</Link>
                </MenuItem>
              </div>
            </SubMenu>

            <SubMenu title="Calls" icon={<FiPhoneCall size="20px" />}>
              <div className="space-y-4">
                <MenuItem className="text-xs" icon={<IoVideocam />}>
                  <Link href="/bookmarks/videocall">Videos Calls</Link>
                </MenuItem>
                <MenuItem className="text-xs" icon={<GiSpeaker />}>
                  <Link href="/bookmarks/audiocall">Audios Calls</Link>
                </MenuItem>
              </div>
            </SubMenu>

            <SubMenu title="List" icon={<BsListStars size="20px" />}>
              <MenuItem>
                <Link href="/bookmarks/referrals">Fans</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/bookmarks/referrals">Following</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/bookmarks/referrals">Favorites</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/bookmarks/referrals">Bookmarks</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/bookmarks/referrals">Blocked Users</Link>
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={<RiBarChartHorizontalFill size="20px" />}
              className="text-gray-600"
            >
              <Link href="/bookmarks/referrals">Referrals</Link>
            </MenuItem>

            <SubMenu title="Market" icon={<FaShoppingBag />}>
              <MenuItem>
                <Link href="/bookmarks/referrals">Favorites</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/bookmarks/referrals">Bookmarks</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/bookmarks/referrals">Blocked Users</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu title="Payments" icon={<MdOutlinePayment size="20px" />}>
              <MenuItem>
                <Link href="/bookmarks/referrals">Favorites</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/bookmarks/referrals">Bookmarks</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/bookmarks/referrals">Blocked Users</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu
              title="Security"
              className="text-xs"
              icon={<GrShieldSecurity size="20px" />}
            >
              <MenuItem className="text-xs" icon={<FaLock size="18px" />}>
                <Link href="/bookmarks/auth2">Two Step Authentication</Link>
              </MenuItem>
              <MenuItem icon={<AiFillSetting size="18px" />}>
                <Link href="/bookmarks/security">Availability Status</Link>
              </MenuItem>
              <MenuItem icon={<IoDocuments size="18px" />}>
                <Link href="/bookmarks/documents">Document</Link>
              </MenuItem>
            </SubMenu>

            <MenuItem icon={<MdOutlineContactSupport size="20px" />}>
              <Link href="/bookmarks/contact">Help and Support</Link>
            </MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </div>
  );
}

export default ProfileNavItem;
