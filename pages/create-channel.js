import React, { useEffect, useState } from "react";
import SideNavLayout from "../components/SideNavLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelsCategoriesStart,
  createChannelStart,
} from "../store/slices/channelsSlice";
import CommonCenterLoader from "../components/helpers/CommonCenterLoader";
import { MdOutlineArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import { notify } from "reapop";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.channels.categories);
  const createChannel = useSelector((state) => state.channels.createChannel);

  const [channelData, setChannelData] = useState({
    name: "",
    description: "",
    category_id: 1,
    privacy: "public",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createChannelStart(channelData));
  };

  useEffect(() => {
    dispatch(fetchChannelsCategoriesStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto p-5">
        <h1 className="text-3xl ml-2 font-semibold tracking-wide ">Channels</h1>
        {categories?.loading ? (
          <div className="row-container">
            <CommonCenterLoader />
          </div>
        ) : categories && categories?.data?.length > 0 ? (
          <div className="my-10 rounded-lg shadow-md py-2 px-5 col-container bg-white">
            <div className="w-[90%] border-b pb-2">
              <div className="flex justify-start items-center space-x-1">
                <div className="p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="bg-lightPlayRed text-white w-6 h-6 rounded-full p-1"
                  >
                    <path
                      fill="currentColor"
                      d="M13 3V11H21V3H13M3 21H11V13H3V21M3 3V11H11V3H3M13 16H16V13H18V16H21V18H18V21H16V18H13V16Z"
                    />
                  </svg>
                </div>

                <h2 className="text-sm font-medium">Create New Channel</h2>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="max-w-[800px] w-full overflow-hidden mx-auto space-y-6 "
            >
              <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={channelData.name}
                  onChange={(event) =>
                    setChannelData({
                      ...channelData,
                      name: event.currentTarget.value,
                    })
                  }
                  required
                  className="relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                />
                <label
                  htmlFor="name"
                  className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
                >
                  Channel Name
                </label>
              </div>
              <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
                <textarea
                  rows="4"
                  type="text"
                  name="description"
                  placeholder=" "
                  value={channelData.description}
                  onChange={(event) =>
                    setChannelData({
                      ...channelData,
                      description: event.currentTarget.value,
                    })
                  }
                  className="resize-none min-h-[56px] overflow-auto relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                  required
                />
                <label
                  htmlFor="description"
                  className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
                >
                  Description
                </label>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2">
                <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
                  <select
                    name="privacy"
                    value={channelData.privacy}
                    className="form-select relative mt-2  mb-1 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                    onChange={(event) =>
                      setChannelData({
                        ...channelData,
                        privacy: event.currentTarget.value,
                      })
                    }
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                  <label
                    htmlFor="privacy"
                    className="origin-0 absolute -top-1 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
                  >
                    Channel Type
                  </label>
                </div>
                <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
                  <select
                    name="category"
                    value={channelData.category_id}
                    onChange={(event) =>
                      setChannelData({
                        ...channelData,
                        category_id: parseInt(event.currentTarget.value),
                      })
                    }
                    className="form-select relative mt-2  mb-1 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                    required
                  >
                    {categories.data.map((category) => (
                      <option
                        value={category.category_id}
                        key={category.unique_id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="category"
                    className="origin-0 absolute -top-1 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
                  >
                    Category
                  </label>
                </div>
              </div>
              <div className="my-4 w-full row-container space-x-4">
                <div
                  className="row-container space-x-2 cursor-pointer"
                  onClick={() => router.push("/channels")}
                >
                  <MdOutlineArrowBack className="w-4 h-4" />
                  <p className="text-sm font-semibold tracking-wide">Go Back</p>
                </div>

                <button
                  className="w-36 h-10 shadow-md text-sm rounded-md hover:bg-lightPlayRed/60 transition duration-300 row-container bg-lightPlayRed text-white font-medium "
                  type="submit"
                >
                  {createChannel.loading ? <CommonCenterLoader /> : "Create"}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </SideNavLayout>
  );
};

export default CreateChannel;
