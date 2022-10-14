import React, { useEffect, useState } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import {
  editUserDetails,
  userNameValidationStart,
  updateUserDetailsStart,
  fetchUserDetailsStart,
} from "../../store/slices/userSlice";
import ProfileInputLoader from "../../components/helpers/ProfileInputLoader";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { notify } from "reapop";

const Monetization = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const validation = useSelector((state) => state.user.validationInputData);
  const profileInputData = useSelector((state) => state.user.profileInputData);

  const [profileInputData1, setProfileInputData1] = useState({});

  const [prices, setPrices] = useState({
    monthly_amount: profile.data.monthly_amount,
    yearly_amount: profile.data.yearly_amount,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (prices.monthly_amount < 100 || prices.yearly_amount < 100) {
      return dispatch(
        notify({
          message: "Minimum amount is ₦100",
          status: "warning",
        })
      );
    }
    if (Object.keys(profileInputData1).length > 0)
      dispatch(updateUserDetailsStart(profileInputData1));
    else dispatch(updateUserDetailsStart());
    dispatch(updateUserDetailsStart(profileInputData1));
  };

  const handleChange = (event) => {
    var name = event.target.name;
    var value = parseInt(event.target.value);
    setPrices({
      ...prices,
      [name]: value,
    });

    dispatch(
      editUserDetails({
        name: event.currentTarget.name,
        value: event.currentTarget.value,
      })
    );
  };

  useEffect(() => {

    if (profile.loading || profile.data === null)
      dispatch(fetchUserDetailsStart());
  }, []);

  useEffect(() => {
    if (!profile.data.monthly_amount) return;
    setPrices({
      ...prices,
      monthly_amount: profile.data.monthly_amount,
      yearly_amount: profile.data.yearly_amount,
    });
  }, [profile?.data]);

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />

        {profile.loading ? (
          <div className="w-full lg:w-4/5 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto mt-5 lg:mr-16 lg:ml-6 border-2 border-gray-500 rounded-md shadow py-4 space-y-6">
            <ProfileInputLoader />
          </div>
        ) : (
          <div className="w-full lg:w-4/5 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto my-5 lg:mr-16 lg:ml-6 md:border-2 md:border-gray-500 rounded-md shadow py-4 space-y-6">
            <h1 className="font-bold text-2xl">Subscription Plans</h1>

            {profile.data.pro_package_config &&
            Object.keys(profile?.data.pro_package_config).length == 0 ? (
              <>
                <section className="bg-red-200 w-4/5 mx-auto shadow-md flex flex-col justify-center items-center rounded-md">
                  <div className="text-center flex flex-col justify-center items-center space-y-2 py-4 px-2">
                    <img
                      width="150"
                      height="150"
                      className="rounded-full h-[150px]  w-[150px] object-cover"
                      src={profile.data.picture}
                      alt="profile-pic"
                    />

                    {profile.data.pro_package_config &&
                    Object.keys(profile?.data.pro_package_config).length ==
                      0 ? (
                      <h5>Free Membership</h5>
                    ) : (
                      <>
                        {`${
                          profile.data.pro_package_config &&
                          profile.data.pro_package_config["name"]
                        } Membership`}
                      </>
                    )}

                    <Link href="/go-pro" passHref>
                      <button className="btn bg-red-600 uppercase text-base rounded-lg">
                        Upgrade to monetize your Account
                      </button>
                    </Link>
                  </div>
                </section>
              </>
            ) : (
              <>
                <p className="font-light text-sm">
                  How would you like to earn? Choose from the options below and
                  customize your subscription plan according to your preference.
                </p>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-x-1 mt-4">
                  <div>
                    <span className="font-medium">
                      Subscription Price (Per Month)
                    </span>
                    <div className="border-2 border-gray-400 rounded-md py-2 px-2 w-full">
                      <input
                        className="w-full outline-none border-0 ring-0 focus:ring-0 focus:outine-none"
                        id="monthly_amount"
                        type="number"
                        step="any"
                        min="0"
                        placeholder=""
                        name="monthly_amount"
                        defaultValue={profile.data.monthly_amount}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <span className="font-medium">
                      Subscription Price (1 year)
                    </span>
                    <div className="border-2 border-gray-400 rounded-md py-2 px-2 w-full">
                      <input
                        className="w-full outline-none border-0 ring-0 focus:ring-0 focus:outine-none"
                        id="yearly_amount"
                        type="number"
                        step="any"
                        min="0"
                        placeholder=""
                        name="yearly_amount"
                        defaultValue={profile.data.yearly_amount}
                        onChange={(event) => {
                          dispatch(
                            editUserDetails({
                              name: event.currentTarget.name,
                              value: event.currentTarget.value,
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </section>
                <div className="text-right">
                  <button
                    onClick={handleSubmit}
                    disabled={profileInputData.buttonDisable}
                    className="btn  bg-red-600 uppercase text-base rounded-lg px-8 py-2"
                  >
                    {profileInputData.loadingButtonContent !== null
                      ? profileInputData.loadingButtonContent
                      : "Submit"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Monetization;
