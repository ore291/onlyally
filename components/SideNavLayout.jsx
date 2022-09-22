import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import MobileNav from "./mobile/MobileNav";
import SideNav from "./mobile/SideNav";
import MainMobileNav from "./mobile/MainMobileNav";
import {useEffect} from "react";
import {hasCookie} from "cookies-next";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import {useRouter} from "next/router"

const SideNavLayout = ({ children }) => {

  // const checkSession = hasCookie("accessToken");
  // const router = useRouter();

  // useEffect(() => {
  //   !checkSession && router.push("/login")
  // }, [checkSession])


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 relative">
      <LeftSideBar />

      <main className="lg:col-span-9 ">{children}</main>
      <MobileView>
        <MobileNav />
      </MobileView>

      <SideNav />
      <BrowserView>
        <RightSideBar />
      </BrowserView>

      <MainMobileNav />
    </div>
  );
};

export default SideNavLayout;
