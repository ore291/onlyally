import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  userNameValidationStart,
  referralValidationStart,
  registerStart,
} from "../store/slices/userSlice";
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

import { notify } from "reapop";

const Register = () => {
  const dispatch = useDispatch();
  const validation = useSelector((state) => state.user.validationInputData);
  const login = useSelector((state) => state.user.loginInputData);
  const signup = useSelector((state) => state.user.registerInputData);
  const [signupInputData, setSignupInputData] = useState({
    referral_code: "",
    device_type: "",
    device_model: "",
    browser_type: "",
  });

  const [forgotPasswordInputData, setForgotPasswordInputData] = useState({});

  const [validationError, setValidationError] = useState("NO");

  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(registerStart(signupInputData));
  };

  

  const handleUsernameValidation = (event, username) => {
    setSignupInputData({
      ...signupInputData,
      username: username,
    });
    dispatch(userNameValidationStart({ username: username }));
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const checkReferralCode = (event) => {
    event.preventDefault();

    if (signupInputData.referral_code) {
      dispatch(
        referralValidationStart({
          referral_code: signupInputData.referral_code,
        })
      );
    } else {
      dispatch(
        notify({ message: "Please enter the Referral code", status: "error" })
      );
    }
  };

  useEffect(() => {
    const referral = "";
    var device_type = "";
    var device_model = "";
    var browser_type = browserName;

    if (isAndroid == true) {
      device_type = "android";
      device_model = mobileModel;
    } else if (isIOS == true) {
      device_type = "ios";
      device_model = mobileModel;
    } else {
      device_type = "web";
      device_model = browserName + " " + browserVersion;
    }

    setSignupInputData({
      ...signupInputData,
      referral_code: referral ? referral : "",
      device_type: device_type,
      device_model: device_model,
      browser_type: browser_type,
    });
  }, []);
  return (
    <div className="register ">
      <div className="  mx-auto max-w-xl min-h-screen md:min-h-full  p-2 pt-14 md:p-20">
        <form
          onSubmit={handleSignup}
          id="form"
          method="post"
          name="form"
          autoComplete="off"
          className="bg-white px-6 py-2 rounded shadow-lg border text-black "
        >
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            // controlId="signupName"
            name="fullname"
            placeholder="Full Name"
            value={signupInputData.name}
            autoComplete="off"
            onChange={(event) =>
              setSignupInputData({
                ...signupInputData,
                name: event.currentTarget.value,
              })
            }
          />
          <div className=" mb-4">
            {validation.isValid}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              name="username"
              required
              autoComplete="off"
              value={signupInputData.user_name}
              placeholder="Username"
              // isValid={validation.isValid}
              // isInvalid={validation.isInValid}
              onChange={(event) =>
                event.currentTarget.value &&
                event.currentTarget.value.length > 3
                  ? handleUsernameValidation(event, event.currentTarget.value)
                  : ""
              }
            />
            {validation.isInValid ? (
              <span className="text-xs text-red-500 font-light text-right">
                Username already taken, Please try another
              </span>
            ) : (
              ""
            )}
            {validation.isValid ? (
              <span className="text-xs text-green-500 font-light text-right">
                Looks Good, the username is availaible
              </span>
            ) : (
              ""
            )}
          </div>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            required
            autoComplete="off"
            value={signupInputData.email}
            onChange={(event) =>
              setSignupInputData({
                ...signupInputData,
                email: event.currentTarget.value,
              })
            }
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            required
            autoComplete="new-password"
            placeholder="Password"
            onChange={(event) =>
              setSignupInputData({
                ...signupInputData,
                password: event.currentTarget.value,
              })
            }
          />
          <div className="mb-4">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              name="referral"
              required
              autoComplete="off"
              value={signupInputData.referral_code}
              placeholder="Referral code (Optional)"
              onChange={(event) =>
                setSignupInputData({
                  ...signupInputData,
                  referral_code: event.currentTarget.value,
                })
              }
            />
            <span
              className="cursor-pointer text-lightPlayRed text-xs font-semibold text-left"
              onClick={checkReferralCode}
            >
              Check Referral
            </span>
          </div>

          <button
            type="submit"
            onClick={handleSignup}
            disabled={login.buttonDisable}
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1"
          >
            {signup.loadingButtonContent !== null
              ? signup.loadingButtonContent
              : "SIGN UP"}
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-lightPlayRed mx-0.5"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-lightPlayRed mx-0.5"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </form>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link href="/login" passHref>
            <span className="no-underline border-b border-blue cursor-pointer text-blue-500">
              Log in
            </span>
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Register;
