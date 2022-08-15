import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import { changePasswordStart } from "../../store/slices/changePasswordSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword() {
  const [inputData, setInputData] = useState({});
  const dispatch = useDispatch();
  const changePassword = useSelector((state) => state.changePassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changePasswordStart(inputData));
  };
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Change Password
            </h1>

            <form action="" className="text-gray-600 space-y-8">
              <div>
                <label htmlFor="" className="uppercase mb-6">
                  Old Password
                </label>
                <input
                  className="w-full border-0 mt-4 border-b-2 border-gray-300 focus:border-0 outline-none"
                  type="password"
                  placeholder="Enter Old Password"
                  name="old_password"
                  required
                  value={inputData.old_password}
                  onChange={(event) =>
                    setInputData({
                      ...inputData,
                      old_password: event.currentTarget.value,
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="" className="uppercase mb-6">
                  New Password
                </label>
                <input
                  className="w-full border-0 mt-4 border-b-2 border-gray-300 focus:border-0 outline-none"
                  type="password"
                  placeholder="Enter New Password"
                  name="password"
                  required
                  value={inputData.password}
                  onChange={(event) =>
                    setInputData({
                      ...inputData,
                      password: event.currentTarget.value,
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="" className="uppercase mb-6">
                  confirm Password
                </label>
                <input
                  className="w-full border-0 mt-4 border-b-2 border-gray-300 focus:border-0 outline-none"
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  required
                  value={inputData.password_confirmation}
                  onChange={(event) =>
                    setInputData({
                      ...inputData,
                      password_confirmation: event.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className="text-center">
                <button
                  className="btn bg-red-600 uppercase text-base rounded-lg"
                  disabled={changePassword.buttonDisable}
                  onClick={handleSubmit}
                >
                  {changePassword.loadingButtonContent != null
                    ? changePassword.loadingButtonContent
                    : "Change Password"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
