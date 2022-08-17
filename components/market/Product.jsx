import { useEffect, useState } from "react";
import QuickProductView from "./QuickProductView";


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

export default Product;