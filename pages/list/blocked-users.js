import React, { useEffect, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineStar,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsBoxArrowRight, BsThreeDots } from "react-icons/bs";
import ProfileNavItem from "../../components/ProfileNavBar";
import NoDataFound from "../../components/NoDataFound/NoDataFound";

import { useDispatch, useSelector } from "react-redux";
import FansCard from "../../components/FansCard";

import { fetchBlockUsersStart } from "../../store/slices/userSlice";

export default function Fan() {
  const [fansTab, setFansTab] = useState("all");
  const [openFansCardOption, setOpenFansCardOption] = useState(false);
  const changeFansTab = (tab) => {
    setFansTab(tab);
  };
  const dispatch = useDispatch();

  const blockUsers = useSelector((state) => state.user.blockUsers);

  useEffect(() => {
    dispatch(fetchBlockUsersStart());
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem color="red" />

        <div className="w-full lg:w-4/5  lg:ml-6 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto m-2 shadow py-4">
          <section className="space-y-2  p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Blocked Users</h1>
            </div>
          </section>

          <section className="my-4">
            <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
            {!blockUsers.loading ? (
              blockUsers.data.total == 0 ? (
                <div className="w-full row-container ">
                  <NoDataFound />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {blockUsers.data.block_users &&
                    blockUsers.data.block_users.map((user, i) => {
                      return (
                        <FansCard
                          user={user.blockeduser}
                          key={i}
                          blocked={true}
                        />
                      );
                    })}
                </div>
              )
            ) : (
              <h1>loading...</h1>
            )}

            {/* <div className="block lg:grid grid-cols-3">
                 
                  {(blockUsers.loading == false && blockUsers.data.block_users) ? blockUsers.data.block_users.map((user, i) => {
                     
                     return (
                      <>
                      <FansCard  user={user.blockeduser} i={i}/>
                      </>
                     )
                  })
                :
                 <h1>loading...</h1>
                }
                </div> */}
          </section>
        </div>
      </div>
    </>
  );
}
