import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategoriesStart, 
       fetchProductSubCategoriesStart,
       userProductsSaveStart } from "../store/slices/productsSlice";


function MarketForm() {
     const   dispatch = useDispatch()
     const productSave = useSelector(state => state.products.productSave)
     const    productCategories = useSelector(state => state.products.productCategories)
     const     productSubCategories = useSelector(state => state.products. productSubCategories)
      const  [productData, setProductData] = useState({
        name: '',  category_id : '', sub_category_id : "",
        quantity: '', image : '',  description :'',
        price : '', 
      })
      const {name, category_id, sub_category_id, quantity, image, description,price} = productData
     
      const fileInput = useRef()
      const  uploadFile = () => {
        fileInput.current.click()
      }
      useEffect(() => {
      dispatch(
          fetchProductCategoriesStart()
        );
      }, []);

      const HandleSubmit = () => {
        dispatch(userProductsSaveStart(productData))
        console.log(productData)
        console.log(productSave)
      }

      const handleChange = (event) => {
        let value = event.target.name == "picture" ? event.target.files[0] : event.target.value;
        if(event.target.name == "category_id"){
          setProductData({
            ...productData,
            category_id: value,
            sub_category_id: '',
          });
        dispatch(fetchProductSubCategoriesStart({category_id: value}));
        }else{
          setProductData({
            ...productData,
            [event.target.name]: value,
          });
        }
      };
      console.log(productSubCategories.data.product_sub_categories)
      console.log(productSave)
    
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
                name="name"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="name"
                onChange = {e =>{handleChange(e)}}
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Quatity*
              </label>
              <input
                type="text"
                name="quantity"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="Quantity"
                onChange = {e =>{handleChange(e)}}
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Price*
              </label>
              <input
                type="text"
                name="price"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="Price"
                onChange = {e =>{handleChange(e)}}
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Category*
              </label>
              <select  type="text"
                name="category_id"
                onChange = {e =>{handleChange(e)}}
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                 >
                   <option >Select a Category </option>
                   {productCategories.loading  == false  &&  productCategories.data.product_categories.map((category, i) => {
                     return(
                       <option value={category.category_id} >{category.name}</option>
                     )
                   })}
                 </select>

              {/* <input
                type="text"
                name="category_id"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="category_id"
            
                onChange = {e =>{handleChange(e)}}
              /> */}
            </div>

            <div className="flex flex-col w-full justify-center ">
              <label htmlFor="" className="text-[12px] font-semibold mb-1">
                Sub Category*
              </label>
              <select  type="text"
                name="sub_category_id"
                onChange = {e =>{handleChange(e)}}
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                 >
                   <option >Select a Sub Category </option>
                   {productSubCategories.loading  == false  && productSubCategories.data.product_sub_categories.map((subCategory, i) => {
                     return(
                       <option value={subCategory.name} >{subCategory.name}</option>
                     )
                   })}
                 </select>
              {/* <input
                type="text"
                name="sub_category_id"
                className="w-[90%] border-white shadow-gray-300 shadow-sm rounded-md text-[10px]"
                placeholder="sub_category_id"
                onChange = {e =>{handleChange(e)}}
              /> */}
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-md w-[90%] lg:w-[48%] px-3  mt-6 p-2 h-[110%] flex flex-col">
        <p className="text-[12px] font-semibold mb-1">Update Product Image</p>
        <div className="w-[100%] h-20 shadow-sm border-2 rounded ">
          <div onClick={uploadFile} className=" space-y-1 flex justify-center flex-col items-center text-gray-500 container my-4 ">
            <FaDownload  className="text-[25px] " />
            <p className="text-[12px] font-normal mb-1 t-[15px]">
              Select an image
            </p>
            <input  className="hidden" ref={fileInput} type='file'   name="picture" accept="image/*"  onChange = {e =>{handleChange(e)}} />
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
            onChange = {e =>{handleChange(e)}}
          ></textarea>
        </div>
        <div onClick={HandleSubmit} className="py-2 my-3 px-2 rounded flex items-center text-white justify-center gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          
          <p className="text-xs  font-bold ">Add Products</p>
        </div>
      </div>

    </div>
  );
}

export default MarketForm;
