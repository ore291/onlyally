import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineArrowBack } from "react-icons/md";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
import { useForm } from "react-hook-form";
import { fetchGroupsCategoriesStart } from "../../store/slices/groupsSlice";
import {useRouter} from "next/router";

const GeneralSettings = () => {
  const router = useRouter(); 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.groups.categories);

  const [billing, enableBilling] = useState(false);

  useEffect(() => {
    dispatch(fetchGroupsCategoriesStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBilling = () => {
    enableBilling(!billing);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-[800px] w-full overflow-hidden mx-auto space-y-6 "
    >
      <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
        <input
          type="text"
          name="name"
          placeholder=""
          required
          className="relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
          {...register("example")}
        />
        <label
          htmlFor="name"
          className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
        >
          Group Name
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
      <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
        <input
          type="text"
          name="url"
          placeholder=""
          required
          className="relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
          {...register("example")}
        />
        <label
          htmlFor="url"
          className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
        >
          Group URL
        </label>
      </div>
      <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
        <select
          name="privacy"
          // value={groupData.privacy}
          className="form-select relative mt-2  mb-1 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
          // onChange={(event) =>
          //   setGroupData({
          //     ...groupData,
          //     privacy: event.currentTarget.value,
          //   })
          // }
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <label
          htmlFor="privacy"
          className="origin-0 absolute -top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
        >
          Page Privacy
        </label>
      </div>
      <div>
        <div className="flex items-center space-x-2 mt-2">
          <h3 className="font-semibold text-2xl">Enable Billing</h3>

          <label htmlFor="toggleB" className="flex items-center cursor-pointer">
            {/* toggle */}
            <div className="relative">
              {/* input */}
              <input
                type="checkbox"
                id="toggleB"
                className="sr-only"
                checked={billing}
                onChange={handleBilling}
              />
              {/* line */}
              <div className="block bg-gray-600 w-14 h-8 rounded-full tick-bg " />
              {/* dot */}
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
            </div>
            {/* label */}
            {/* <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div> */}
          </label>
        </div>
        <p className="text-xs font-medium my-0">
          Get users to pay when subscribing to this group
        </p>
        {billing ? (
          <>
            <div className="my-2">
              <label
                htmlFor="month-price"
                className="block text-lg font-semibold text-gray-700"
              >
                Subscription Price (Per Month)*
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm"> &#8358; </span>
                </div>
                <input
                  type="text"
                  name="month-price"
                  id="month-price"
                  required
                  className="focus:ring-textPlayRed focus:border-textPlayRed block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder={0.0}
                />
              </div>
            </div>
            <div className="my-2">
              <label
                htmlFor="3month-price"
                className="block text-lg font-semibold text-gray-700"
              >
                Subscription Price (3 Months)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm"> &#8358; </span>
                </div>
                <input
                  type="text"
                  name="3month-price"
                  id="3month-price"
                  className="focus:ring-textPlayRed focus:border-textPlayRed block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder={0.0}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label
                    htmlFor="toggle1"
                    className="flex items-center cursor-pointer"
                  >
                    {/* toggle */}
                    <div className="relative">
                      {/* input */}
                      <input type="checkbox" id="toggle1" className="sr-only" />
                      {/* line */}
                      <div className="block bg-gray-600 w-14 h-8 rounded-full tick-bg " />
                      {/* dot */}
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
                    </div>
                    {/* label */}
                    {/* <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div> */}
                  </label>
                </div>
              </div>
            </div>
            <div className="my-2">
              <label
                htmlFor="6month-price"
                className="block text-lg font-semibold text-gray-700"
              >
                Subscription Price (6 Months)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm"> &#8358; </span>
                </div>
                <input
                  type="text"
                  name="6month-price"
                  id="6month-price"
                  className="focus:ring-textPlayRed focus:border-textPlayRed block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder={0.0}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label
                    htmlFor="toggle2"
                    className="flex items-center cursor-pointer"
                  >
                    {/* toggle */}
                    <div className="relative">
                      {/* input */}
                      <input type="checkbox" id="toggle2" className="sr-only" />
                      {/* line */}
                      <div className="block bg-gray-600 w-14 h-8 rounded-full tick-bg " />
                      {/* dot */}
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
                    </div>
                    {/* label */}
                    {/* <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div> */}
                  </label>
                </div>
              </div>
            </div>
            <div className="my-2">
              <label
                htmlFor="12month-price"
                className="block text-lg font-semibold text-gray-700"
              >
                Subscription Price (12 Months)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm"> &#8358; </span>
                </div>
                <input
                  type="text"
                  name="12month-price"
                  id="12month-price"
                  className="focus:ring-textPlayRed focus:border-textPlayRed block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder={0.0}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label
                    htmlFor="toggle3"
                    className="flex items-center cursor-pointer"
                  >
                    {/* toggle */}
                    <div className="relative">
                      {/* input */}
                      <input type="checkbox" id="toggle3" className="sr-only" />
                      {/* line */}
                      <div className="block bg-gray-600 w-14 h-8 rounded-full tick-bg " />
                      {/* dot */}
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
                    </div>
                    {/* label */}
                    {/* <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div> */}
                  </label>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="my-4 w-full row-container space-x-4">
        <div
          className="row-container space-x-2 cursor-pointer"
            onClick={() => router.back()}
        >
          <MdOutlineArrowBack className="w-4 h-4" />
          <p className="text-sm font-semibold tracking-wide">Go Back</p>
        </div>

        <button
          className="w-36 h-10 shadow-md text-sm rounded-md hover:bg-lightPlayRed/60 transition duration-300 row-container bg-lightPlayRed text-white font-medium "
          type="submit"
        >
          {/* {createChannel.loading ? <CommonCenterLoader /> : "Create"} */} Save
        </button>
      </div>
    </form>
  );
};

export default GeneralSettings;
