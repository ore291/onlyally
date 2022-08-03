import React, { useState, useEffect } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import {
  fetchUserDetailsStart,
  updateUserStart,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Availability() {
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({})
  const profile = useSelector((state) => state.user.profile);
  const status = useSelector((state) => state.user.onlineStatus);
  useEffect(() => {
    dispatch(fetchUserDetailsStart());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserStart(inputData))
  }

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem color="red" />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-10 shadow py-4">
          <form className="w-2/3 mx-auto space-y-4 ">
            <h1 className="font-semibold border-b-2 border-gray-300 text-center pb-4 ">
              Availability Status
            </h1>
            <p className="uppercase font-medium">ONLINE STATUS</p>
            {profile.loading ? (
              <p>Loading...</p>
            ) : (
              <select className="w-full border-0 border-b-2 border-gray-300 focus:border-0 outline-none" onChange={(e)=>{setInputData({
                is_online_status : e.currentTarget.value
              })}}>
                <option
                  selected={profile.data.is_online_status == 1}
                  value="1"
                >
                  Online
                </option>
                <option
                  selected={profile.data.is_online_status == 0}
                  value="0"
                >
                  Offline
                </option>
              </select>
            )}

            <div className="text-center">
              <button 
              disabled={inputData.is_online_status == null}
              type="submit" className="btn bg-red-600 uppercase text-base rounded-lg" onClick={handleSubmit}>
               {
                 status.loadingButtonContent ? status.loadingButtonContent : "Submit"
               }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
