import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import MobileNav from "./mobile/MobileNav";
import SideNav from "./mobile/SideNav";
import MainMobileNav from "./mobile/MainMobileNav";

const SideNavLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 relative">
      <LeftSideBar />
      <main className="lg:col-span-9 ">{children}</main>
      <MobileNav />
      <SideNav />
      <RightSideBar />
      <MainMobileNav />
    </div>
  );
};

export default SideNavLayout;
