import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherUserProductsStart, fetchUserProductsStart } from "../store/slices/productsSlice";
import QuickProductView from "./market/QuickProductView";


const Product = (productInfo) => {
    const [showQuickView, setShowQuickView] = useState(false)
      const toggleShowQuickView = () =>{
        setShowQuickView(!showQuickView)
      }
    
    return (
  
      <div className="shadow-md  rounded-md p-4 w-full ">
  
            {showQuickView  && <QuickProductView  toggleShowQuickView={toggleShowQuickView} productInfo={productInfo} />}
        <div className="relative  hover:opacity-80">
          <img
            src={productInfo.productInfo.picture}
            alt="product"
            className="h-52 w-full object-cover rounded-md"
          />
  
          <div onClick={toggleShowQuickView}  className="absolute transition-opacity duration-500 ease-in-out bottom-1 cursor-pointer w-full px-8 text-center shadow-sm py-1 bg-black text-white">
            <p>QUICK VIEW</p>
  
          </div>
        </div>
         
        <div className="flex flex-col space-y-1">
          <span>{productInfo.productInfo.name}</span>
          <span className="text-gray-500 text-lg">
            &#9733; &#9733; &#9734; &#9734; &#9733;
          </span>
          <span className="font-medium">{productInfo.productInfo.user_product_price_formatted}</span>
        </div>
      </div>
    );
  };
  


const EcomCategory = () => {

    const products = useSelector(state => state.products.products)
  const othersProducts = useSelector(state => state.products.otherUserProducts)



  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch( fetchUserProductsStart())
    dispatch( fetchOtherUserProductsStart())
  }, [])
   
    return(
       <div className="flex "> 
            <div className="w-1/4">
                <div className="mx-auto  shadow-xl h-[50vh]">
                    <div className="flex flex-col h-[3rem] m-2 my-6 w-[80%]">
                        <label className="text-semibold" htmlFor="search">
                            Search
                        </label>
                        <input type="text"  className="h-[2rem] rounded-lg  shadow-xl outline-none border-slate-400" id="search" name="search" /> 
                    </div>
                    <div className="flex  h-[3rem] m-2  my-6 flex-col w-[80%]">
                        <label className="text-semibold" htmlFor="search">
                            Category
                        </label>
                        <select  id="search" name="search" className="h-[2rem] rounded-lg  shadow-xl outline-none border-slate-400" > 
                             <option>   </option>
                        </select>
                    </div>
                    <div className="flex  h-[3rem] m-2 my-6 flex-col  w-[80%]">
                        <label className="text-semibold" htmlFor="search">
                            Sub Category
                        </label>
                        <select  id="search" name="search" className="h-[2rem] rounded-lg  shadow-xl outline-none border-slate-400"> 
                             <option>   </option>
                        </select>
                    </div>
                    <input type="radio" id="hightolow" name="arangement" value="High to Low"/>
                    <label  className="ml-[1rem]  text-semibold" for="hightolow">High to Low</label><br/>
                    <input type="radio" id="lowtohigh" name="arangement" value="Low to High"/>
                    <label  className="ml-[1rem] text-semibold" for="lowtohigh">Low to high</label><br/>
                <div className="flex my-[1rem]">
                    <button className="p-[0.5rem] text-semibold text-white  px-[1.2rem] bg-red-500 mr-2 rounded-xl">reset</button>
                    <button className="p-[0.5rem] text-semibold text-white  px-[1.2rem] bg-red-500 mr-2 rounded-xl ">Submit</button>
                </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {othersProducts.loading == false &&  othersProducts.data.user_products.map((product, i) => {
              return(
                <Product productInfo={product} key={i}/>
              )
            })}
           
            </div>
       </div>
    )
}

export default EcomCategory