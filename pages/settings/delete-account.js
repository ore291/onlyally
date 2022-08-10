import React, { useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { deleteAccountStart } from "../../store/slices/userSlice";
export default function DeleteAccount() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteAccountStart({ password: password }));
    setPassword("");
  };
  const changeSeePassword = () => {
    setSeePassword((prev) => !prev);
  };
  const DeleteDetails = useSelector((state) => state.user.deleteAccount);
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="w-2/3 mx-auto space-y-8 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Delete Password
            </h1>

            <div className="text-center space-y-2 mb-8">
              <h1 className="font-bold uppercase text-base">
                Hope, see you soon
              </h1>
              <p className="font-medium">
                Note: Once you delete your account, you will lose your account
                and wishlist details
              </p>
            </div>

            <div className="text-gray-600 space-y-8 my">
              <div className="relative">
                <label htmlFor="" className="uppercase mb-6">
                  Password
                </label>
                <input
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  value={password}
                  className="w-full bg-white-900 m-4 rounded-full placeholder-[white] border-[rgba(0,0,0,0.05)] outline-none"
                  type={seePassword ? "text" : "password"}
                  placeholder="Enter Password"
                />
                <div className="cursor-pointer" onClick={changeSeePassword}>
                  {seePassword ? (
                    <AiFillEye className="right-[30px] absolute top-[55px] bg-white rounded-xl" />
                  ) : (
                    <AiFillEyeInvisible className="right-[30px] absolute top-[55px] bg-white rounded-xl" />
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={(e) => handleSubmit(e)}
                  style={{ borderRadius: "50px" }}
                  disabled={DeleteDetails.buttonDisable}
                  className="btn bg-red-600 uppercase text-base h-[40px]"
                >
                  {DeleteDetails.loadingButtonContent !== null
                    ? DeleteDetails.loadingButtonContent
                    : "delete account"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
