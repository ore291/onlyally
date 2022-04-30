/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import Link from "next/link";
import { BookmarkClick, MarketClick, ProfileClick } from "./NavClicks";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { BiHistory, BiUserCircle } from "react-icons/bi";
import { BsBookmark, BsListStars } from "react-icons/bs";
import {
  MdWifiCalling,
  MdOutlinePayment,
  MdOutlineContactSupport,
} from "react-icons/md";
import { VscReferences } from "react-icons/vsc";
import { FaSuitcase, FaCartPlus } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";
import Menus from "./linksWrapper/Menus";

function ProfileNavItem({ linkcolor, securitycolor }) {
  const [bookClick, setBookClick] = useState(false);
  const handleBookClick = () => setBookClick(!bookClick);

  const [profileClick, setProfileClick] = useState(false);
  const handleProfileClick = () => setProfileClick(!profileClick);

  const [marketPageClick, setMarketPageClick] = useState(false);
  const handleMarketPageClick = () => setMarketPageClick(!marketPageClick);

  return (
    <div className="mt-16 w-[20%]">
      <div className="pr-7 py-7 block bg-white rounded shadow-sm">
        <div className="space-y-4 px-8 font-semibold">
          <span className="flex cursor-pointer space-x-5">
            <RiBarChartHorizontalFill className="mt-1 font-semibold" />
            <p>Dashboard</p>
          </span>
          <span
            className="flex space-x-5 cursor-pointer"
            onClick={handleProfileClick}
          >
            <BiUserCircle className="mt-1 font-semibold" />
            <p>Profile</p>
          </span>
          {profileClick && <ProfileClick className="absolute  top-5 right-0" />}

          <span className="flex space-x-5 cursor-pointer">
            <BiHistory className="mt-1 font-semibold" />
            <p>Stories</p>
          </span>

          <span
            className="flex space-x-5 cursor-pointer"
            onClick={handleBookClick}
          >
            <BsBookmark className="mt-1 font-semibold" />
            <p>Bookmarks</p>
          </span>
          {bookClick && <BookmarkClick className="absolute  top-5 right-0" />}

          <span className="flex space-x-5 cursor-pointer">
            <MdWifiCalling className="mt-1 font-semibold" />
            <p>Calls</p>
          </span>

          <span className="flex space-x-5 cursor-pointer">
            <BsListStars className="mt-1 font-semibold" />
            <p>Lists</p>
          </span>
          <Link href="/bookmarks/referrals">
            <span className="flex space-x-5 cursor-pointer">
              <VscReferences className="mt-1 font-semibold" />
              <p>Referrals</p>
            </span>
          </Link>

          {/* <Link href="/market" replace className="flex space-x-5 cursor-pointer">  */}
          {/* <a> */}
          <span
            className="flex space-x-5 cursor-pointer"
            onClick={handleMarketPageClick}
          >
            <FaCartPlus className="mt-1 font-semibold" />
            <p>Market</p>
          </span>
          {marketPageClick && (
            <MarketClick className="absolute  top-5 right-0" />
          )}
          {/* </a> */}
          {/* </Link> */}
          <span className="flex space-x-5 cursor-pointer">
            <MdOutlinePayment className="mt-1 font-semibold" />
            <p>Payments</p>
          </span>

          <Menus />

          <Link href="/bookmarks/contact">
            <span
              className="flex space-x-5 cursor-pointer"
              style={{ color: linkcolor }}
            >
              <MdOutlineContactSupport className="mt-1 font-semibold text-base" />
              <p>Help and Support </p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileNavItem;
