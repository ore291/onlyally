/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GiSpeaker, GiPlayerNext } from "react-icons/gi";
import {
  BiHistory,
  BiUserCircle,
  BiTransferAlt,
  BiMessageAdd,
  BiWallet,
} from "react-icons/bi";
import {
  BsBookmark,
  BsListStars,
  BsPeopleFill,
  BsBagCheck,
  BsCreditCard2Back,
  BsBank,
} from "react-icons/bs";
import { FaLock, FaBars, FaTimes, FaCrown } from "react-icons/fa";
import {
  AiFillSetting,
  AiFillAudio,
  AiOutlineCheckSquare,
} from "react-icons/ai";
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
import { AiOutlineBars } from "react-icons/ai";
import { IoIosPeople, IoMdPhotos } from "react-icons/io";
import {
  MdPassword,
  MdOutlineNotes,
  MdOutlinePayments,
  MdSubscriptions,
} from "react-icons/md";

function ProfileNavItem({
  dashboardColor,
  storiesColor,
  referralsColor,
  helpColor,
  securityColor,
  isOpen,
  authColor,
}) {
  const [nav, setNav] = useState(false);
  const [icon, setIcon] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    setIcon(!icon);
  };
  return (
    <>
      <div className=" flex justify-end  p-2  lg:hidden ">
        {icon ? (
          <FaTimes size="25px" color="#B30D28" onClick={handleNav} />
        ) : (
          <FaBars size="25px" color="#B30D28" onClick={handleNav} />
        )}
      </div>
      {nav ? (
        <div className="lg-0 w-[20%] px-2 lg:px-0 z-0">
          <div className="pr-7 py-7 block lg:bg-white rounded shadow-sm ">
            <ProSidebar className="block">
              <Menu iconShape="circle" className="font-medium text-gray-600">
                <MenuItem
                  icon={<RiBarChartHorizontalFill size="20px" />}
                  style={{ color: dashboardColor }}
                >
                  <Link href="/dashboard">Dashboard</Link>
                </MenuItem>

                <SubMenu title="Profile" icon={<BiUserCircle size="20px" />}>
                  <div className="space-y-4">
                    <MenuItem className="text-xs" icon={<ImProfile />}>
                      <Link href="/settings/profile">My Profile</Link>
                    </MenuItem>
                    <MenuItem icon={<RiLockPasswordLine size="18px" />}>
                      <Link href="/settings/change-password">
                        Change Password
                      </Link>
                    </MenuItem>
                    <MenuItem icon={<IoIosPeople size="18px" />}>
                      <Link href="/settings/session">Session Management</Link>
                    </MenuItem>
                    <MenuItem icon={<RiDeleteBin5Line size="18px" />}>
                      <Link href="/settings/delete-account">
                        Delete Account
                      </Link>
                    </MenuItem>
                  </div>
                </SubMenu>

                <MenuItem
                  icon={<BiHistory size="20px" />}
                  style={{ color: storiesColor }}
                >
                  <Link href="/stories">Stories</Link>
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
                      <Link href="/bookmarks/audio">Audios</Link>
                    </MenuItem>
                  </div>
                </SubMenu>

                <SubMenu title="Calls" icon={<FiPhoneCall size="20px" />}>
                  <div className="space-y-4">
                    <MenuItem className="text-xs" icon={<IoVideocam />}>
                      <Link href="/calls/video-call">Videos Calls</Link>
                    </MenuItem>
                    <MenuItem className="text-xs" icon={<GiSpeaker />}>
                      <Link href="/calls/audio-call">Audios Calls</Link>
                    </MenuItem>
                  </div>
                </SubMenu>

                <SubMenu title="List" icon={<BsListStars size="20px" />}>
                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/list/fans">Fans</Link>
                  </MenuItem>

                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/referrals">Following</Link>
                  </MenuItem>

                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/bookmarks/referrals">Favorites</Link>
                  </MenuItem>

                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/bookmarks/referrals">Bookmarks</Link>
                  </MenuItem>

                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/bookmarks/referrals">Blocked Users</Link>
                  </MenuItem>
                </SubMenu>

                <MenuItem
                  icon={<RiBarChartHorizontalFill size="20px" />}
                  className="text-gray-600"
                  style={{ color: referralsColor }}
                >
                  <Link href="/referrals">Referrals</Link>
                </MenuItem>

                <SubMenu title="Market" icon={<FaShoppingBag />}>
                  <MenuItem icon={<FaShoppingBag size="18px" />}>
                    <Link href="/market/marketplace">Market Place</Link>
                  </MenuItem>
                  <MenuItem icon={<BiMessageAdd size="18px" />}>
                    <Link href="/market/marketB">Add Products</Link>
                  </MenuItem>
                  <MenuItem icon={<BiTransferAlt size="18px" />}>
                    <Link href="/market/transaction">View Transactions</Link>
                  </MenuItem>
                  <MenuItem icon={<BsBagCheck size="18px" />}>
                    <Link href="/market/market">Market Checkout</Link>
                  </MenuItem>
                  <MenuItem icon={<MdOutlineNotes size="18px" />}>
                    <Link href="/market/orderList">Orders</Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineCheckSquare size="18px" />}>
                    <Link href="/market/payment">Checkout</Link>
                  </MenuItem>
                </SubMenu>

                <SubMenu
                  title="Payments"
                  icon={<MdOutlinePayment size="20px" />}
                >
                  {/* <MenuItem icon={<BsCreditCard2Back size="18px" />}>
                    <Link href="/payment/your-cards">Your Cards</Link>
                  </MenuItem> */}
                  <MenuItem icon={<BsBank size="18px" />}>
                    <Link href="/payment/add-bank">Add Bank</Link>
                  </MenuItem>
                  <MenuItem icon={<BiWallet size="18px" />}>
                    <Link href="/payment/wallet">Wallet</Link>
                  </MenuItem>
                  <MenuItem icon={<MdOutlinePayments size="18px" />}>
                    <Link href="/payment/my-payment">My Payments</Link>
                  </MenuItem>
                  {/* <MenuItem icon={<GiPlayerNext size="18px" />}>
                    <Link href="/payment/subscription">My Subscriptions</Link>
                  </MenuItem>
                  <MenuItem icon={<MdSubscriptions size="18px" />}>
                    <Link href="/payment/transaction-history">
                      My Subscribers
                    </Link>
                  </MenuItem> */}
                </SubMenu>

                <SubMenu
                  title="Security"
                  className="text-xs"
                  icon={<GrShieldSecurity size="20px" />}
                >
                  <MenuItem
                    className="text-xs"
                    icon={<FaLock size="18px" />}
                    style={{ color: authColor }}
                  >
                    <Link href="/settings/auth2">Two Step Authentication</Link>
                  </MenuItem>
                  <MenuItem icon={<AiFillSetting size="18px" />}>
                    <Link href="/settings/availability-status">
                      Availability Status
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<IoDocuments size="18px" />}>
                    <Link href="/settings/documents">Document</Link>
                  </MenuItem>
                </SubMenu>

                <MenuItem
                  icon={
                    <MdOutlineContactSupport
                      size="20px"
                      style={{ color: helpColor }}
                    />
                  }
                >
                  <Link href="/contact-us">Help and Support</Link>
                </MenuItem>
                <MenuItem
                  icon={<FaCrown size="20px" style={{ color: helpColor }} />}
                >
                  <Link href="/go-pro">Go Pro</Link>
                </MenuItem>
              </Menu>
            </ProSidebar>
          </div>
        </div>
      ) : null}
      <div className="lg-0  w-[20%] px-2 lg:px-0 z-0 hidden lg:block">
        <div className="pr-7 py-7 block md:bg-white rounded shadow-sm ">
          <ProSidebar className="block">
            <Menu iconShape="circle" className="font-medium text-gray-600">
              <MenuItem
                icon={<RiBarChartHorizontalFill size="20px" />}
                style={{ color: dashboardColor }}
              >
                <Link href="/dashboard">Dashboard</Link>
              </MenuItem>

              <SubMenu title="Profile" icon={<BiUserCircle size="20px" />}>
                <div className="space-y-4">
                  <MenuItem className="text-xs" icon={<ImProfile />}>
                    <Link href="/settings/profile">My Profile</Link>
                  </MenuItem>
                  <MenuItem icon={<RiLockPasswordLine size="18px" />}>
                    <Link href="/settings/change-password">
                      Change Password
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<IoIosPeople size="18px" />}>
                    <Link href="/settings/session">Session Management</Link>
                  </MenuItem>
                  <MenuItem icon={<RiDeleteBin5Line size="18px" />}>
                    <Link href="/settings/delete-account">Delete Account</Link>
                  </MenuItem>
                </div>
              </SubMenu>

              <MenuItem
                icon={<BiHistory size="20px" />}
                style={{ color: storiesColor }}
              >
                <Link href="/stories">Stories</Link>
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
                    <Link href="/bookmarks/audio">Audios</Link>
                  </MenuItem>
                </div>
              </SubMenu>

              <SubMenu title="Calls" icon={<FiPhoneCall size="20px" />}>
                <div className="space-y-4">
                  <MenuItem className="text-xs" icon={<IoVideocam />}>
                    <Link href="/calls/video-call">Videos Calls</Link>
                  </MenuItem>
                  <MenuItem className="text-xs" icon={<GiSpeaker />}>
                    <Link href="/calls/audio-call">Audios Calls</Link>
                  </MenuItem>
                </div>
              </SubMenu>

              <SubMenu title="List" icon={<BsListStars size="20px" />}>
                <MenuItem icon={<BsPeopleFill size="18px" />}>
                  <Link href="/bookmarks/fans">Fans</Link>
                </MenuItem>

                <MenuItem icon={<BsPeopleFill size="18px" />}>
                  <Link href="/bookmarks/following">Following</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/bookmarks/favourites">Favourites</Link>
                </MenuItem>

                {/* <MenuItem icon={<BsPeopleFill size="18px" />}>
                  <Link href="/bookmarks/referrals">Bookmarks</Link>
                </MenuItem> */}

                <MenuItem icon={<BsPeopleFill size="18px" />}>
                  <Link href="/bookmarks/referrals">Blocked Users</Link>
                </MenuItem>
              </SubMenu>

              <MenuItem
                icon={<RiBarChartHorizontalFill size="20px" />}
                className="text-gray-600"
                style={{ color: referralsColor }}
              >
                <Link href="/referrals">Referrals</Link>
              </MenuItem>

              <SubMenu title="Market" icon={<FaShoppingBag />}>
                <MenuItem icon={<FaShoppingBag size="18px" />}>
                  <Link href="/market/marketplace">Market Place</Link>
                </MenuItem>
                <MenuItem icon={<BiMessageAdd size="18px" />}>
                  <Link href="/market/marketB">Add Products</Link>
                </MenuItem>
                <MenuItem icon={<BiTransferAlt size="18px" />}>
                  <Link href="/market/transaction">View Transactions</Link>
                </MenuItem>
                <MenuItem icon={<BsBagCheck size="18px" />}>
                  <Link href="/market/market">Market Checkout</Link>
                </MenuItem>
                <MenuItem icon={<MdOutlineNotes size="18px" />}>
                  <Link href="/market/orderList">Orders</Link>
                </MenuItem>
                <MenuItem icon={<AiOutlineCheckSquare size="18px" />}>
                  <Link href="/market/cart">Cart</Link>
                </MenuItem>
                <MenuItem icon={<AiOutlineCheckSquare size="18px" />}>
                  <Link href="/market/payment">Checkout</Link>
                </MenuItem>
              </SubMenu>

              <SubMenu title="Payments" icon={<MdOutlinePayment size="20px" />}>
                {/* <MenuItem icon={<BsCreditCard2Back size="18px" />}>
                  <Link href="/payment/your-cards">Your Cards</Link>
                </MenuItem> */}
                <MenuItem icon={<BsBank size="18px" />}>
                  <Link href="/payment/add-bank">Add Bank</Link>
                </MenuItem>
                <MenuItem icon={<BiWallet size="18px" />}>
                  <Link href="/payment/wallet">Wallet</Link>
                </MenuItem>
                <MenuItem icon={<MdOutlinePayments size="18px" />}>
                  <Link href="/payment/my-payment">My Payments</Link>
                </MenuItem>
                {/* <MenuItem icon={<GiPlayerNext size="18px" />}>
                  <Link href="/payment/subscription">My Subscriptions</Link>
                </MenuItem>
                <MenuItem icon={<MdSubscriptions size="18px" />}>
                  <Link href="/payment/transaction-history">
                    My Subscribers
                  </Link>
                </MenuItem> */}
              </SubMenu>

              <SubMenu
                title="Security"
                className="text-xs"
                icon={<GrShieldSecurity size="20px" />}
              >
                <MenuItem
                  className="text-xs"
                  icon={<FaLock size="18px" />}
                  style={{ color: authColor }}
                >
                  <Link href="/settings/auth2">Two Step Authentication</Link>
                </MenuItem>
                <MenuItem icon={<AiFillSetting size="18px" />}>
                  <Link href="/settings/availability-status">
                    Availability Status
                  </Link>
                </MenuItem>
                <MenuItem icon={<IoDocuments size="18px" />}>
                  <Link href="/settings/documents">Document</Link>
                </MenuItem>
              </SubMenu>

              <MenuItem
                icon={
                  <MdOutlineContactSupport
                    size="20px"
                    style={{ color: helpColor }}
                  />
                }
              >
                <Link href="/contact-us">Help and Support</Link>
              </MenuItem>

              <MenuItem
                icon={<FaCrown size="20px" style={{ color: helpColor }} />}
              >
                <Link href="/go-pro">Go Pro</Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      </div>
    </>
  );
}

export default ProfileNavItem;
