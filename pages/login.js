import { getProviders, signIn ,useSession} from "next-auth/react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  FaUserCircle,
  FaQuestionCircle,
  FaFacebookF,
  FaTwitter,
  FaCompass,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { IoNewspaperSharp } from "react-icons/io5";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion,
} from "react-device-detect";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession()

  const userLogin = async () => {
    var email = emailRef.current.value;
    var password = passwordRef.current.value;
    const res = await signIn("credentials", {
      callbackUrl: "/",
      // redirect: false,
      email: email,
      password: password
    });

    
    
    
  };



  useEffect(() => {
    if (router.query.error) {
      console.log(router.query.error);
      setLoginError(router.query.error);
      setEmail(router.query.email);
    }
  }, [router]);

  return (
    <div className="pt-[70px] ">
      <div className="relative p-1 bg-cover  md:mx-auto w-full md:max-w-7xl rounded-3xl h-[500px] bg-[url('/banner-mobile.jpg')] bg-playRed/40 lg:bg-playRed/50 bg-blend-darken ">
        <div className="col-container">
          <div className="w-40 h-10 lg:h-14 relative">
            <Image
              src={"/logo-mobile.png"}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 xs:gap-y-3  ss:gap-y-[55px] text-white text-center pt-5 lg:pt-16 px-3 ">
          <div className="lg:col-span-2 col-container space-y-1.5 xs:space-y-3 lg:space-y-0 lg:-mt-20">
            <div className="">
              <h1 className="text-2xl ss:text-3xl lg:text-5xl font-bold lg:font-bold">
                Create Original Content
              </h1>
              <p className="text-lg lg:text-2xl font-semibold ">
                for your passionate fans and get paid for it
              </p>
            </div>

            <div className="md:hidden  w-60 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer">
              <span className="font-semibold">Register</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold lg:font-bold">
                JOIN CREATE EARN
              </h1>
              <p className="text-sm leading-1 ss:leading-5 md:text-lg font-semibold mt-2 ss:mt-0">
                Playjor is an exclusive content and communication tool for all
                influncers like youtubers, fitness trainers, models, content
                creators, public figures and social media influencers, who can
                connect and share their content
              </p>
            </div>
          </div>

          <div className="flex mt-6 sm:mt-20 md:mt-0 flex-col space-y-2 items items-center justify-center">
            <div className="inputBox text-gray-900">
              <FaUserCircle className="w-8 h-8 text-lightPlayRed" />
              <input
                placeholder="Email"
                className="flex-1 bg-white rounded-full border-none focus:ring-0 outline-none text-xs"
                type="email"
                name="email"
                id="email"
                ref={emailRef}
              />
              <p className="text-red">{loginError}</p>
            </div>
            <div className="inputBox text-gray-900 relative">
              <IoIosLock className="w-8 h-8 text-lightPlayRed" />
              <input
                placeholder="Password"
                className="flex-1 rounded-full bg-white border-none focus:ring-0 outline-none text-xs"
                type="password"
                name="Password"
                id="Password"
                ref={passwordRef}
              />
              <FaQuestionCircle className="w-5 h-5 absolute right-3 text-lightPlayRed" />
            </div>
            <div
              onClick={userLogin}
              className="bg-lightPlayRed inputBox cursor-pointer"
            >
              <p className="text-white text-lg font-semibold ">Login</p>
            </div>
            <div className=" flex flex-col space-y-3 items-center py-14">
              <p className="text-playRed lg:text-white text-sm text-center  font-semibold shadow-sm">
                Or login with
              </p>
              <div className="flex items-center justify-around space-x-4">
                <div className="social-login-buttons">
                  <FaFacebookF className="w-8 h-8 text-blue-700" />
                </div>
                <div className="social-login-buttons">
                  <FaTwitter className="w-8 h-8 text-[#1DA1F2] " />
                </div>
                <div className="social-login-buttons">
                  <FcGoogle className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-2 py-1 pr-0.5 bg-white rounded-full absolute -bottom-6 sm:-bottom-4 lg:-bottom-6 lg:-left-6 -left-4">
          <div className="relative md:w-40 md:h-40 w-[60px] h-[60px]     ">
            <Image
              src={"/playjor-icon.png"}
              layout="fill"
              objectFit="contain"
              className="p-1 rounded-full "
            />
          </div>
        </div>
      </div>

      <div className="mt-60 md:mt-10 max-w-xs sm:max-w-sm md:max-w-5xl lg:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-0  place-content-center">
        <div className="md:rounded-r-none login-card lg:col-span-2 ">
          <h1 className="text-textPlayRed text-center md:text-left font-bold text-2xl lg:text-4xl ">
            Create a free profile on Playjor!, create your content, invite your
            fans to subscribe and earn money from your content!
          </h1>
          <p className="text-sm md:text-lg font-semibold text-gray-800 text-center md:text-left mt-4">
            Simply create a profile post exclusive images, video and tutorials
            and invite your social media fans to subscribe to view.
            <p>
              You set the monthly membership &#40; subs &#41; rate, so
              you&apos;re always in control of how much your fans pay. and how
              much you earn.
            </p>
          </p>
        </div>
        <div className="md:rounded-l-none login-card ">
          <div className="relative md:hidden w-40 h-40 md:w-60 md:h-60">
            <Image
              src={"/playjor-icon.png"}
              layout="fill"
              objectFit="contain"
              className="p-1 rounded-full"
            />
          </div>
          <div className="relative hidden md:flex w-40 h-40 md:w-60 md:h-60">
            <Image
              src={"/playjor-logo-icon.png"}
              layout="fill"
              objectFit="contain"
              className="p-1 rounded-full"
            />
          </div>
          <h1 className="flex md:hidden text-6xl leading-none tracking-wide text-center text-playRed font-bold">
            Playjor
          </h1>
        </div>
      </div>
      <div className="mt-6 max-w-xs sm:max-w-sm md:max-w-5xl lg:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="login-card z-10">
          <h1 className="font-semibold text-3xl text-lightPlayRed uppercase ">
            create
          </h1>
          <div className="relative w-44 h-36 my-5">
            <Image src={"/icon-6.png"} layout="fill" objectFit="contain" />
          </div>
          <div className="text-center flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-semibold text-slate-700 leading-tight">
              Create exclusive, unique, original, picture, audio, video content
              your fans {"can't"} find anywhere else but here.
            </p>
            <div className="w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer">
              <span className="font-bold text-white">Create account</span>
            </div>
          </div>
        </div>
        <div className="login-card z-10">
          <h1 className="font-semibold text-3xl text-lightPlayRed uppercase ">
            channels
          </h1>
          <div className="relative w-44 h-36 my-5">
            <Image
              src={"/banner-thumb-1.png"}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="text-center flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-semibold text-slate-700 leading-tight">
              Share your content in your private channel. Where your fans pay
              your own chosen subscription fee, weekly, monthly or one time
              payment.
            </p>
            <div className="w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer">
              <span className="font-bold text-white">Create account</span>
            </div>
          </div>
        </div>
        <div className="login-card z-10">
          <h1 className="font-semibold text-3xl text-lightPlayRed uppercase ">
            create
          </h1>
          <div className="relative w-44 h-28  my-5">
            <Image
              src={"/case-study-4.png"}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="text-center flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-semibold text-slate-700 leading-tight">
              Create a fan group where your fans can share their own content
              with other fans, earn from the m,onthly fees fans pay to join your
              exclusive group.
            </p>
            <div className="w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer">
              <span className="font-bold text-white">Create account</span>
            </div>
          </div>
        </div>
      </div>
      <div className="slant-header"></div>
      <section className="bg-lightPlayRed  slanted-div ">
        <div className="flex flex-col space-y-8">
          <h1 className="font-semibold text-3xl text-white  ">
            Discover Playjor.com
          </h1>
          <div className="row-container space-x-10">
            <div className="col-container space-y-2">
              <div className="row-container p-4 bg-white rounded-full">
                <FaCompass className="h-10 w-10 text-lightPlayRed" />
              </div>
              <p className="text-center text-white text-2xl font-bold">
                Explore
              </p>
            </div>
            <div className="col-container space-y-2">
              <div className="row-container p-4 bg-white rounded-full">
                <IoNewspaperSharp className="h-10 w-10 text-lightPlayRed" />
              </div>
              <p className="text-center text-white text-2xl font-bold">Blog</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-playRed text-lg slant-footer">&copy;2022</div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

export default Login;
