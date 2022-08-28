import { useSelector, useDispatch } from "react-redux";
import { setNavState } from "../../store/slices/NavSlice";
import { useRouter } from "next/router";
import HeaderCreateMenu from "../mobile/HeaderCreateMenu";
import {
  FiCompass,
  FiHome,
  FiPlusSquare,
  FiMail,
  FiBell,
  FiUser,
} from "react-icons/fi";

const MobileNav = () => {
  const router = useRouter();
  const navOpen = useSelector((state) => state.navbar.open);
  const dispatch = useDispatch();

  const toggleSideBar = () => {
    dispatch(setNavState(!navOpen));
  };

  const navigate = (url) => {
    dispatch(setNavState(false));
    router.push(url);
  };

  return (
    <div className="fixed inline-flex md:hidden -bottom-1 inset-x-0 z-20">
      <div className="w-full h-12  text-white">
        <div className="relative z-40 h-12 bg-playRed grid grid-cols-5 place-items-center place-content-center justify-center">
          <button
            className="nav-btn"
            title="Home"
            onClick={() => navigate("/")}
          >
            <FiHome className="w-12 h-6" />
          </button>

          {/* <button
            className="nav-btn"
            title="explore"
            onClick={() => navigate("/explore")}
          >
            <FiCompass className="w-12 h-6" />
          </button> */}

          <button
            className="nav-btn"
            title="Message"
            onClick={() => navigate("/messages")}
          >
            <FiMail className="w-12 h-6" />
          </button>
          <HeaderCreateMenu />
          {/* <button className="nav-btn" title="Add" onClick={() => navigate("/")}>
            <FiPlusSquare className="w-12 h-6" />
          </button> */}

          <button
            className="nav-btn"
            title="Notifications"
            onClick={() => navigate("/notifications")}
          >
            <FiBell className="w-12 h-6" />
          </button>

          <button className="nav-btn" title="Menu" onClick={toggleSideBar}>
            <FiUser className="w-12 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
