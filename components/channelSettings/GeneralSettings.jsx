import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineArrowBack } from "react-icons/md";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
import { useForm } from "react-hook-form";
import {
  fetchChannelsCategoriesStart,
  updateChannelInfoStart,
  updateChannelPrivacyStart,
} from "../../store/slices/channelsSlice";
import { useRouter } from "next/router";

const GeneralSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const body = {
      ...data,
      slug: channel.slug,
    };
    dispatch(updateChannelInfoStart(body));
  };

  const onPrivacySubmit = (data) => {
    console.log(data);
    const body = {
      ...data,
      private: JSON.parse(data.private),
      slug: channel.slug,
      amount: parseInt(data.amount),
    };

    dispatch(updateChannelPrivacyStart(body));
  };

  const categories = useSelector((state) => state.channels.categories);

  const { data: channel, loading } = useSelector(
    (state) => state.channels.channelData
  );

  const { data: update, loading: updating } = useSelector(
    (state) => state.channels.updateChannel
  );

  const { data: privacy, loading: privating } = useSelector(
    (state) => state.channels.updateChannelPrivacy
  );

  // useEffect(() => {
  //   dispatch(fetchGroupsCategoriesStart());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {channel !== null ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[800px] w-full overflow-hidden mx-auto space-y-6 "
          >
            <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
              <input
                type="text"
                name="name"
                placeholder=""
                required
                disabled
                value={channel.name}
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
                className="resize-none min-h-[56px] overflow-auto relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                required
                defaultValue={channel.bio.description}
                {...register("description")}
              />
              <label
                htmlFor="description"
                className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
              >
                Description
              </label>
            </div>
            <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
              <select
                name="category"
                disabled
                defaultValue={channel.category_id}
                className="form-select relative mt-2  mb-1 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                required
              >
                {categories.data.map((category) => (
                  <option value={category.category_id} key={category.unique_id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="category"
                className="origin-0 absolute -top-2 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
              >
                Category
              </label>
            </div>

            <div className="mb-8 mt-3 w-full row-container space-x-4">
              {/* <div
            className="row-container space-x-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <MdOutlineArrowBack className="w-4 h-4" />
            <p className="text-sm font-semibold tracking-wide">Go Back</p>
          </div> */}

              <button
                className="w-36 h-10 shadow-md text-sm rounded-md hover:bg-lightPlayRed/60 transition duration-300 row-container bg-lightPlayRed text-white font-medium "
                type="submit"
              >
                {/* {createChannel.loading ? <CommonCenterLoader /> : "Create"} */}{" "}
                {updating ? "Loading..." : "Save"}
              </button>
            </div>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default GeneralSettings;
