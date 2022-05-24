import { FaDownload } from "react-icons/fa";

function MarketForm() {
  return (
    <div className="block lg:flex w-full space-x-5">
      <div className="mt-6 p-2 rounded-md w-full lg:w-[48%] ml-3">
        <div className="pb-5">
          <form
            action=""
            className="block lg:flex flex-col justify-center space-y-6 "
          >
            <div className="block lg:flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Name*
              </label>
              <input
                type="text"
                name="Name"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="Name"
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Quality*
              </label>
              <input
                type="text"
                name="Quality"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="QUality"
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Price*
              </label>
              <input
                type="text"
                name="Price"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="Price"
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Catigory*
              </label>
              <input
                type="text"
                name="Catigory"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="Catigory"
              />
            </div>

            <div className="flex flex-col w-full justify-center ">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Sub Catigory*
              </label>
              <input
                type="text"
                name="Sub Catigory"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="Sub Catigory"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-md w-[90%] lg:w-[48%] px-3  mt-6 p-2 h-[110%] flex flex-col">
        <p className="text-[12px] font-semibold mb-1">Update Product Image</p>
        <div className="w-[100%] h-20 shadow-sm border-2 rounded ">
          <div className="space-y-1 flex justify-center flex-col items-center text-gray-500 container my-4 ">
            <FaDownload className="text-[25px] " />
            <p className="text-[12px] font-normal mb-1 t-[15px]">
              Select an image
            </p>
          </div>
        </div>
        <p className="text-[12px] font-normal mb-1 t-[10px] text-gray-500 ml-3 my-2.5">
          Please upload .jpg .jpeg and ,png format image only
        </p>
        <div className="flex flex-col">
          <p className="text-[12px] font-semibold mb-1">Description</p>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="3"
            className="border-2 border-gray-300 shadow-sm rounded-md"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default MarketForm;
