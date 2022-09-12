import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {resetPasswordStart} from "../../store/slices/userSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({});

  const router = useRouter();
  const query = router.query;

  const resetData = useSelector((state) => state.user.forgotPasswordInputData);

  const token = query.token;



  const handleChange = ({ currentTarget: input }) => {
    const submitData = { ...inputData };
    submitData[input.name] = input.value;
    submitData["reset_token"] = token;
    setInputData(submitData);
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPasswordStart(inputData));
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
              {/* <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                Just enter your email address below and we will send you a
                link to reset your password!
              </p>
            </div> */}
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={event => handleForgotPasswordSubmit(event)}
                method="post"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="new_password"
                  >
                    New Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="new_password"
                    type="password"
                    required
                    onChange={e => handleChange(e)}
                    value={inputData.password}
                    name="password"
                    placeholder="Enter New Password..."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="confirm_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="confirm_password"
                    type="password"
                    required
                    onChange={e => handleChange(e)}
                    name="password_confirmation"
                    value={inputData.password_confirmation}
                    placeholder="Confirm Password..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={resetData.buttonDisable}
                  >
                    {resetData.loadingButtonContent !== null
                      ? resetData.loadingButtonContent
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

export default ResetPassword;
