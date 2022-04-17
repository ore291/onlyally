import SideNavLayout from "../components/SideNavLayout";
import ProfileTabs from "../components/userProfile/ProfileTabs";
import Button from "../components/Button";
import Image from "next/image";
import {
  BsFillArrowLeftCircleFill,
  BsGenderAmbiguous,
  BsShare,
  BsEye,
  BsTwitter,
  BsFacebook,
  BsYoutube,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { FaBell, FaVideo, FaGlobeAfrica } from "react-icons/fa";
import { MdMail, MdOutlineLocationOn } from "react-icons/md";
import { RiUpload2Line, RiInstagramFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { GiPhone } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {fetchUserDetailsStart, fetchUserDetailsSuccess} from '../store/slices/userSlice';
import { useEffect } from "react";
import configuration from "react-global-configuration";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {data: session} =  useSession();

  console.log(configuration.get('config.site_name'));
  useEffect(() => {
    if(session){
       var accessToken =  session.accessToken;
    var userId = session.userId;
    dispatch(fetchUserDetailsStart({accessToken, userId }));
    }
 
  },[dispatch, session])
  return (
    <SideNavLayout>
      <div className="max-w-4xl xl:max-w-6xl">
        <div className="w-full bg-gradient-to-t from-transparent to-lightPlayRed px-10 relative -mt-24">
          <img
            src="https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
            alt=""
            srcSet=""
            className="object-cover w-full h-[400px]"
          />
          <div
            className="w-8 h-8 rounded-full absolute z-10 top-28 left-8 bg-white cursor-pointer"
            onClick={() => router.back()}
          >
            <BsFillArrowLeftCircleFill className="h-8 w-8  " />
          </div>
          <div className="absolute z-10 top-28 right-12">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                group  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <div className="w-8 h-8 rounded-full  bg-black cursor-pointer row-container">
                      <BsThreeDotsVertical className="h-5 w-5 text-white " />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-[150px] lg:w-[15vw]  px-4 mt-3 transform shadow-md -translate-x-1/2 -left-20 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-y-1 bg-white p-1 grid-cols-1">
                          <div className="hover:bg-gray-100 hover:text-lightPlayRed   h-8 p-1 rounded-md cursor-pointer flex items-center justify-start">
                            <p className="font-bold text-xs">
                             Report User
                            </p>
                          </div>
                         
                          <div className="hover:bg-gray-100 hover:text-lightPlayRed  h-10 p-1 rounded-md cursor-pointer flex items-center justify-start">
                            <p className="font-bold text-xs">
                              I don&apos;t like the user. Add to blocklists.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>

          <div className="absolute -bottom-16 left-36">
            <div className="row-container bg-white p-1 rounded-3xl">
              <div className="w-16 h-16 md:w-32 md:h-32 relative rounded-3xl">
                <Image
                  src="https://picsum.photos/200/200?random=3"
                  alt="side-img"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-10 grid grid-cols-1 lg:grid-cols-3 gap-x-3 bg-white mb-10">
          <div className="space-y-3 mt-16 ">
            <div className="ml-14">
              <div className="flex items-center justify-start space-x-2 ">
                <p className="text-2xl font-bold leading-[40px]">
                  oreoluwa padonu
                </p>
                <div className="bg-[#FEBA44] py-1 px-2 text-xs text-white font-semibold rounded-md">
                  <span className="leading-2">PRO</span>
                </div>
              </div>
              <p className="text-lg font-semibold mb-1">@orex</p>
            </div>

            <div className="row-container space-x-3 ml-12">
              <div className="row-container  p-3 bg-gray-200 rounded-md">
                <FaBell className="w-5 h-5" />
              </div>
              <div className="row-container  p-3 bg-gray-200 rounded-md">
                <MdMail className="w-5 h-5" />
              </div>
              <div className="row-container  p-3 bg-gray-200 rounded-md">
                <FaVideo className="w-5 h-5" />
              </div>
              <div className="row-container  p-3 bg-gray-200 rounded-md">
                <GiPhone className="w-5 h-5" />
              </div>
              <div className="row-container  p-3 bg-gray-200 rounded-md">
                <RiUpload2Line className="w-5 h-5" />
              </div>
            </div>
            <div className="flex justify-between px-2 ml-12">
              <div className="col-container space-y-0.5">
                <p className="text-lg font-semibold">45</p>
                <span>Post</span>
              </div>
              <div className="col-container space-y-0.5">
                <p className="text-lg font-semibold">352</p>
                <span>Following</span>
              </div>
              <div className="col-container space-y-0.5">
                <p className="text-lg font-semibold">52.3k</p>
                <span>Fans</span>
              </div>
            </div>
            <div className="flex justify-between ml-12">
              <Button text="Subscribe" active={true} extraClasses="w-32 h-9" />

              <div className="row-container w-28 h-9 rounded-md bg-[#FF1534] cursor-pointer">
                <img
                  src="/tips.png"
                  alt=""
                  srcSet=""
                  className="w-4 h-4 invert object-contain"
                />
                <p className="text-sm font-semibold text-white ml-1">Tip</p>
              </div>
            </div>
            <div className="row-container bg-gray-50 p-1 rounded-md py-2">
              <div className="bg-gray-100 p-1 rounded-md">
                <p className="text-sm font-bold">
                  {" "}
                  See Oreoluwa &apos;s about info
                </p>
              </div>
            </div>
            <p className=" text-sm font-semibold">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. At rem
              esse facilis corporis non. Sit voluptatum error labore suscipit
              quidem modi accusamus iusto est recusandae cupiditate ullam cumque
              itaque earum aspernatur, cum quo laborum dolores eaque maiores
              corrupti maxime, quas animi.
            </p>
            <div className="flex flex-col">
              <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                <BsEye className="w-4 h-4" />
                <div className="flex space-x-1 items-center">
                  <span className="text-sm">19m</span>
                  <span className="text-sm text-lightPlayRed">online</span>
                </div>
              </div>
              <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                <AiOutlineLink className="w-4 h-4" />
                <span className="text-sm">Gaming</span>
              </div>
              <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                <BsGenderAmbiguous className="w-4 h-4" />
                <span className="text-sm">Male</span>
              </div>
              <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                <FaGlobeAfrica className="w-4 h-4" />
                <span className="text-sm">Living in Nigeria</span>
              </div>
              <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                <MdOutlineLocationOn className="w-4 h-4" />
                <span className="text-sm">Located in Lagos Nigeria</span>
              </div>
              <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                <BsShare className="w-4 h-4" />
                <div className="row-container space-x-2">
                  <BsTwitter className="w-4 h-4 text-[#1DA1F2]  cursor-pointer" />
                  <BsFacebook className="w-4 h-4 text-[#4267B2] cursor-pointer" />
                  <BsYoutube className="w-4 h-4 text-[#FF0000] cursor-pointer" />
                  <RiInstagramFill className="w-4 h-4 text-[#C13584] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <ProfileTabs />
          </div>
        </div>
      </div>
    </SideNavLayout>
  );
};

export default Profile;
