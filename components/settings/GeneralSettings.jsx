import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineArrowBack } from "react-icons/md";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
import { useForm } from "react-hook-form";
import {
  fetchGroupsCategoriesStart,
  updateGroupInfoStart,
  updateGroupPrivacyStart,
} from "../../store/slices/groupsSlice";
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

      slug: group.slug,
    };
    dispatch(updateGroupInfoStart(body));
  };

  const onPrivacySubmit = (data) => {
    console.log(data);
    const body = {
      ...data,
      private: JSON.parse(data.private),
      slug: group.slug,
      amount : parseInt(data.amount)
    };
  
    dispatch(updateGroupPrivacyStart(body));
  };

  const categories = useSelector((state) => state.groups.categories);

  const { data: group, loading } = useSelector(
    (state) => state.groups.groupData
  );

  const { data: update, loading: updating } = useSelector(
    (state) => state.groups.updateGroup
  );

  const { data: privacy, loading: privating } = useSelector(
    (state) => state.groups.updateGroupPrivacy
  );

  const [billing, enableBilling] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchGroupsCategoriesStart());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleBilling = () => {
    enableBilling(!billing);
  };

  return (
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
            value={group.name}
            className="relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
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
            defaultValue={group.bio.description}
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
            defaultValue={group.category_id}
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

      <form
        name="privacy-form"
        onSubmit={handleSubmit2(onPrivacySubmit)}
        className="mt-10"
      >
        <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-4 bg-transparent">
          <select
            name="privacy"
            defaultValue={group.is_private}
            className="form-select relative mt-2  mb-1 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
            // onChange={(event) =>
            //   setGroupData({
            //     ...groupData,
            //     privacy: event.currentTarget.value,
            //   })
            // }
            {...register2("private")}
          >
            <option value={true}>Private</option>
            <option value={false}>Public</option>
          </select>
          <label
            htmlFor="privacy"
            className="origin-0 absolute -top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
          >
            Page Privacy
          </label>
        </div>
        {group.is_private === true ? (
          <div>
            <div className="flex items-center space-x-2 mt-2">
              <h3 className="font-semibold text-2xl">Enable Billing</h3>

              <label
                htmlFor="toggleB"
                className="flex items-center cursor-pointer"
              >
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
                    Subscription Duration
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <select
                      name="duration"
                      id="duration"
                      required
                      {...register2("duration")}
                      defaultValue={group.configuration.billing.duration}
                      className="focus:ring-textPlayRed focus:border-textPlayRed block w-full  sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="bi-monthly">Bi-Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="my-2">
                  <label
                    htmlFor="month-price"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Subscription Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {" "}
                        &#8358;{" "}
                      </span>
                    </div>
                    <input
                      type="text"
                      name="month-price"
                      id="month-price"
                      {...register2("amount")}
                      defaultValue={group.configuration.billing.amount}
                      required
                      className="focus:ring-textPlayRed focus:border-textPlayRed block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder={0.0}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : null}

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
            {privating ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default GeneralSettings;
