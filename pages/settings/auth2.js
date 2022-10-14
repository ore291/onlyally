import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileNavItem from "../../components/ProfileNavBar";
import { twoStepAuthUpdateStart } from "../../store/slices/userSlice";
import Switch from "react-switch";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AiFillEye } from "react-icons/ai";
export default function Auth2() {
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  useEffect(() => {
    setTwoFactor(
      localStorage.getItem("is_two_step_auth_enabled") != undefined
        ? localStorage.getItem("is_two_step_auth_enabled") == 1
          ? true
          : false
        : false
    );
  }, []);
  const dispatch = useDispatch();
  const changeSeePassword = () => {
    setSeePassword((prev) => !prev);
  };
  const handleSubmit = () => {
    dispatch(twoStepAuthUpdateStart({ password: password }));
    setPassword("");
  };
  const [checked, setChecked] = useState(twoFactor);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem authColor={"#B30D28"} />
        <div className="w-full lg:w-4/5  lg:ml-6 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto mt-10 shadow py-4">
          <section className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Two Step Authetication
            </h1>
            <div className="justify-center gap-8 text-center flex items-start">
              <Image
                src="/images/settings/twostep.svg"
                alt="two-step"
                width="300px"
                height="200px"
              />
              <div className="block lg:flex gap-4">
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  onColor="#DC2626"
                />
                <p className="font-medium">{checked ? "Enable" : "Disable"} </p>
              </div>
            </div>
            {checked && (
              <>
                <form>
                  <label className="font-medium ml-6 mb-4">Password</label>
                  <div className="relative ">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type={seePassword ? "text" : "password"}
                      className="w-full bg-white-900 m-4 rounded-full placeholder-[white] border-[rgba(0,0,0,0.05)]"
                      placeholder="enter your password"
                      value={password}
                    />
                    <div className="cursor-pointer" onClick={changeSeePassword}>
                      {seePassword ? (
                        <AiFillEye className="right-[30px] absolute top-[30px] bg-white rounded-xl" />
                      ) : (
                        <AiFillEyeInvisible className="right-[30px] absolute top-[30px] bg-white rounded-xl" />
                      )}
                    </div>
                  </div>
                </form>
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="btn bg-red-600 font-bold uppercase text-base rounded-xl"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
