import { TiVideo } from "react-icons/ti";
import { MdSmartDisplay } from "react-icons/md";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import CreateButton from "./helpers/CreateButton";


const LeftSideBar = () => {
  const router = useRouter();
  return (
    <aside className="hidden z-10 lg:block col-span-2 h-[90vh] border-solid  pt-10  self-start border-r-[1px] sticky top-16 overflow-none ">
      <div className="flex flex-col space-y-4 ">
        <Link href="/" passHref>
          <div className="side-nav-button">
            <div className="side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.46967 11.4696L4.46914 8.47014L4.4702 8.46908L9.20693 3.73235L9.22845 3.71083L9.22846 3.71082L9.22851 3.71077C9.60618 3.33309 9.92142 3.01784 10.2 2.78134C10.4906 2.53467 10.7902 2.32993 11.1502 2.21296C11.7025 2.0335 12.2975 2.0335 12.8498 2.21296C13.2098 2.32993 13.5094 2.53467 13.8 2.78134C14.0786 3.01785 14.3939 3.33312 14.7715 3.71083L14.7931 3.73235L22.5303 11.4696C22.8232 11.7625 22.8232 12.2374 22.5303 12.5303C22.2374 12.8232 21.7626 12.8232 21.4697 12.5303L19.75 10.8106V16.1999V16.2321C19.75 17.0449 19.75 17.7005 19.7066 18.2314C19.662 18.778 19.5676 19.2582 19.3413 19.7024C18.9818 20.408 18.4081 20.9817 17.7025 21.3412C17.2582 21.5676 16.7781 21.6619 16.2315 21.7066C15.7006 21.75 15.045 21.75 14.2321 21.7499H14.2H9.8H9.76788C8.95505 21.75 8.29944 21.75 7.76853 21.7066C7.2219 21.6619 6.74175 21.5676 6.29754 21.3412C5.59193 20.9817 5.01825 20.408 4.65873 19.7024C4.43238 19.2582 4.33803 18.778 4.29336 18.2314C4.24999 17.7005 4.24999 17.0449 4.25 16.232L4.25 16.1999V10.8106L2.53033 12.5303C2.23744 12.8232 1.76256 12.8232 1.46967 12.5303C1.17678 12.2374 1.17678 11.7625 1.46967 11.4696Z"
                  fill="#fff"
                ></path>
              </svg>
            </div>
            <span className="font-bold">News Feed</span>
          </div>
        </Link>
        <Link href="/explore" passHref>
          <div className="side-nav-button">
            <div className="side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM9.49404 11.5179C9.67955 10.9613 9.77232 10.6831 9.9304 10.452C10.0704 10.2473 10.2473 10.0704 10.452 9.9304C10.6831 9.77232 10.9613 9.67955 11.5179 9.49404L14.4821 8.50596L14.4821 8.50596C14.9707 8.34311 15.2149 8.26169 15.3774 8.31962C15.5187 8.37003 15.63 8.48127 15.6804 8.62263C15.7383 8.78507 15.6569 9.02935 15.494 9.51789L14.506 12.4821C14.3204 13.0387 14.2277 13.3169 14.0696 13.548C13.9296 13.7527 13.7527 13.9296 13.548 14.0696C13.3169 14.2277 13.0387 14.3204 12.4821 14.506L9.51789 15.494C9.02935 15.6569 8.78507 15.7383 8.62263 15.6804C8.48127 15.63 8.37003 15.5187 8.31962 15.3774C8.26169 15.2149 8.34311 14.9707 8.50596 14.4821L8.50596 14.4821L9.49404 11.5179Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span className="font-bold">Explore</span>
          </div>
        </Link>

        <Link href="/live" passHref> 
          <div className="side-nav-button">
            <div className="side-icon">
              <TiVideo className="text-white h-6 w-6" />
            </div>
            <span className="font-bold">Live</span>
          </div>
        </Link>
        <Link href="/channels" passHref>
          <div className="side-nav-button">
            <div className="side-icon">
              <MdSmartDisplay className="text-white h-6 w-6" />
            </div>
            <span className="font-bold">Channels</span>
          </div>
        </Link>

        <Link href="/groups" passHref>
          <div className="side-nav-button">
            <div className="side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,17c0,0.55-0.45,1-1,1H7c-0.55,0-1-0.45-1-1l0-0.61 c0-1.18,0.68-2.26,1.76-2.73C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2 C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43L0,17 c0,0.55,0.45,1,1,1l3.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2 C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1 c0.4,0.68,0.63,1.46,0.63,2.29V18l3.5,0c0.55,0,1-0.45,1-1L24,16.43z M12,6c1.66,0,3,1.34,3,3c0,1.66-1.34,3-3,3s-3-1.34-3-3 C9,7.34,10.34,6,12,6z"
                  fill="#fff"
                ></path>
              </svg>
            </div>
            <span className="font-bold">Groups</span>
          </div>
        </Link>
        <Link href="/playhub" passHref>
          <div className="side-nav-button">
            <div className="side-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#fff"
                viewBox="0 0 16 16"
                className="h-6 w-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z"
                ></path>
              </svg>
            </div>
            <span className="font-bold">Playhub</span>
          </div>
        </Link>

        {/* <div className="justify-start p-1 pl-2 space-x-4 cursor-pointer row-container  w-40 h-10 ml-5 text-white   bg-lightPlayRed rounded-full">
          <FiPlus className="h-6 w-6" />{" "}
          <p className="text-lg font-medium">Create</p>
        </div> */}

        <CreateButton />
      </div>
    </aside>
  );
};

export default LeftSideBar;
