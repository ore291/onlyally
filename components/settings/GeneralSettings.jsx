import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineArrowBack } from "react-icons/md";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
import { useForm } from "react-hook-form";
import { fetchGroupsCategoriesStart } from "../../store/slices/groupsSlice";

const GeneralSettings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.groups.categories);

  useEffect(() => {
    dispatch(fetchGroupsCategoriesStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="my-4 w-full row-container space-x-4">
        <div
          className="row-container space-x-2 cursor-pointer"
          //   onClick={() => router.push("/channels")}
        >
          <MdOutlineArrowBack className="w-4 h-4" />
          <p className="text-sm font-semibold tracking-wide">Go Back</p>
        </div>

        <button
          className="w-36 h-10 shadow-md text-sm rounded-md hover:bg-lightPlayRed/60 transition duration-300 row-container bg-lightPlayRed text-white font-medium "
          type="submit"
        >
          {/* {createChannel.loading ? <CommonCenterLoader /> : "Create"} */}
        </button>
      </div>
    </form>
  );
};

export default GeneralSettings;
