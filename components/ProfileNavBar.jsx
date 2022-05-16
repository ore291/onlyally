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
      <div className="mt-16 flex justify-end  p-2  md:hidden">
        {icon ? (
          <FaTimes size="25px" color="#B30D28" onClick={handleNav} />
        ) : (
          <FaBars size="25px" color="#B30D28" onClick={handleNav} />
        )}
      </div>
      {nav ? (
        <div className="mt-0 md:mt-16 w-[20%] px-2 md:px-0 z-0">
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
                      <Link href="/bookmarks/profile">My Profile</Link>
                    </MenuItem>
                    <MenuItem icon={<RiLockPasswordLine size="18px" />}>
                      <Link href="/bookmarks/password">Change Password</Link>
                    </MenuItem>
                    <MenuItem icon={<IoIosPeople size="18px" />}>
                      <Link href="/bookmarks/session">Session Management</Link>
                    </MenuItem>
                    <MenuItem icon={<RiDeleteBin5Line size="18px" />}>
                      <Link href="/bookmarks/deleteaccount">
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
                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/bookmarks/fans">Fans</Link>
                  </MenuItem>

                  <MenuItem icon={<BsPeopleFill size="18px" />}>
                    <Link href="/bookmarks/referrals">Following</Link>
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
                  <Link href="/bookmarks/referrals">Referrals</Link>
                </MenuItem>

                <SubMenu title="Market" icon={<FaShoppingBag />}>
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
                  <MenuItem icon={<BsCreditCard2Back size="18px" />}>
                    <Link href="/payment/your-cards">Your Cards</Link>
                  </MenuItem>
                  <MenuItem icon={<BsBank size="18px" />}>
                    <Link href="/payment/addbank">Add Bank</Link>
                  </MenuItem>
                  <MenuItem icon={<BiWallet size="18px" />}>
                    <Link href="/payment/addbank">Wallet</Link>
                  </MenuItem>
                  <MenuItem icon={<MdOutlinePayments size="18px" />}>
                    <Link href="/payment/my-payment">My Payments</Link>
                  </MenuItem>
                  <MenuItem icon={<GiPlayerNext size="18px" />}>
                    <Link href="/payment/subscription">My Subscriptions</Link>
                  </MenuItem>
                  <MenuItem icon={<MdSubscriptions size="18px" />}>
                    <Link href="/payment/transaction-history">
                      My Subscribers
                    </Link>
                  </MenuItem>
                </SubMenu>

                <SubMenu
                  open
                  title="Security"
                  className="text-xs"
                  icon={<GrShieldSecurity size="20px" />}
                >
                  <MenuItem
                    className="text-xs"
                    icon={<FaLock size="18px" />}
                    style={{ color: authColor }}
                  >
                    <Link href="/bookmarks/auth2">Two Step Authentication</Link>
                  </MenuItem>
                  <MenuItem icon={<AiFillSetting size="18px" />}>
                    <Link href="/bookmarks/security">Availability Status</Link>
                  </MenuItem>
                  <MenuItem icon={<IoDocuments size="18px" />}>
                    <Link href="/bookmarks/documents">Document</Link>
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
                  <Link href="/bookmarks/contact">Help and Support</Link>
                </MenuItem>
                <MenuItem
                  icon={<FaCrown size="20px" style={{ color: helpColor }} />}
                >
                  <Link href="/gopro">Go Pro</Link>
                </MenuItem>
              </Menu>
            </ProSidebar>
          </div>
        </div>
      ) : null}
      <div className="mt-0 md:mt-16 w-[20%] px-2 md:px-0 z-0 hidden md:block">
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
                <MenuItem icon={<BsPeopleFill size="18px" />}>
                  <Link href="/bookmarks/fans">Fans</Link>
                </MenuItem>

                <MenuItem icon={<BsPeopleFill size="18px" />}>
                  <Link href="/bookmarks/referrals">Following</Link>
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
                <Link href="/bookmarks/referrals">Referrals</Link>
              </MenuItem>

              <SubMenu title="Market" icon={<FaShoppingBag />}>
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

              <SubMenu title="Payments" icon={<MdOutlinePayment size="20px" />}>
                <MenuItem icon={<BsCreditCard2Back size="18px" />}>
                  <Link href="/payment/your-cards">Your Cards</Link>
                </MenuItem>
                <MenuItem icon={<BsBank size="18px" />}>
                  <Link href="/payment/addbank">Add Bank</Link>
                </MenuItem>
                <MenuItem icon={<BiWallet size="18px" />}>
                  <Link href="/payment/addbank">Wallet</Link>
                </MenuItem>
                <MenuItem icon={<MdOutlinePayments size="18px" />}>
                  <Link href="/payment/my-payment">My Payments</Link>
                </MenuItem>
                <MenuItem icon={<GiPlayerNext size="18px" />}>
                  <Link href="/payment/subscription">My Subscriptions</Link>
                </MenuItem>
                <MenuItem icon={<MdSubscriptions size="18px" />}>
                  <Link href="/payment/transaction-history">
                    My Subscribers
                  </Link>
                </MenuItem>
              </SubMenu>

              <SubMenu
                open
                title="Security"
                className="text-xs"
                icon={<GrShieldSecurity size="20px" />}
              >
                <MenuItem
                  className="text-xs"
                  icon={<FaLock size="18px" />}
                  style={{ color: authColor }}
                >
                  <Link href="/bookmarks/auth2">Two Step Authentication</Link>
                </MenuItem>
                <MenuItem icon={<AiFillSetting size="18px" />}>
                  <Link href="/bookmarks/security">Availability Status</Link>
                </MenuItem>
                <MenuItem icon={<IoDocuments size="18px" />}>
                  <Link href="/bookmarks/documents">Document</Link>
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
                <Link href="/bookmarks/contact">Help and Support</Link>
              </MenuItem>

              <MenuItem
                icon={<FaCrown size="20px" style={{ color: helpColor }} />}
              >
                <Link href="/gopro">Go Pro</Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      </div>
    </>
  );
}

export default ProfileNavItem;
