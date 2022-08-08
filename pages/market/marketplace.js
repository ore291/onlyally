import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons.jsx";
import { FaSearch } from "react-icons/fa";
import { fetchUserProductsStart } from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import QuickProductView from "../../components/market/QuickProductView";


const Product = (productInfo) => {
  const [showQuickView, setShowQuickView] = useState(false)
    const toggleShowQuickView = () =>{
      setShowQuickView(!showQuickView)
    }
    console.log(productInfo)
  return (
    <div className="shadow-md my-12  mx-4 rounded-md p-4 w-full lg:w-[25%]">
          {showQuickView  && <QuickProductView  toggleShowQuickView={toggleShowQuickView} productInfo={productInfo} />}
      <div className="relative  hover:opacity-80">
        <img
          src={productInfo.productInfo.picture}
          alt="product"
          className="h-52 w-full rounded-md"
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
const Marketplace = () => {
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch( fetchUserProductsStart())
  }, [])

  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 px-2 bg-white mx-auto mt-20 shadow py-4 space-y-4">
          <section>
            <MarketButtons />
            <img
              src="/images/settings/market.jpg"
              alt="market"
              className="w-full my-4"
            />
              
            <div className="text-center">
              <h1 className="text-center capitalize">featured products</h1>
              <p className="text-gray-400">
                Amazing products added recently in our catalog
              </p>
            </div>
          </section>

          <main className="flex justify-end my-8">
            <div className="flex shadow-md">
              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-white border-none focus:outline-none focus:border-none"
              />
              <button className="btn bg-red-600 uppercase text-base">
                <FaSearch />
              </button>
            </div>
          </main>

          <section className="block lg:flex justify-between flex-wrap ">
            {products.loading == false &&  products.data.user_products.map((product, i) => {
              return(
                <Product productInfo={product}/>
              )
            })}
           
          </section>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
