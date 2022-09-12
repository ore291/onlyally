import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {forgotPasswordStart} from "../store/slices/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const forgotPassword = useSelector(
    (state) => state.user.forgotPasswordInputData
  );
  const [forgotPasswordInputData, setForgotPasswordInputData] = useState({});

  const handleForgotPassword = (event) => {
    event.preventDefault();
    dispatch(forgotPasswordStart(forgotPasswordInputData));
  };
  return (
    <div className="register">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen px-6">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage: 'url("/playjor-icon.png")',
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  Just enter your email address below and we will send you a
                  link to reset your password!
                </p>
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    required
                    value={forgotPasswordInputData.email}
                    onChange={(event) =>
                      setForgotPasswordInputData({
                        ...forgotPasswordInputData,
                        email: event.currentTarget.value,
                      })
                    }
                    placeholder="Enter Email Address..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    onClick={handleForgotPassword}
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    disabled={forgotPassword.buttonDisable}
                  >
                    {forgotPassword.loadingButtonContent !== null
                      ? forgotPassword.loadingButtonContent
                      : "Reset Password"}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/register"
                  >
                    Create an Account!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/login"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
