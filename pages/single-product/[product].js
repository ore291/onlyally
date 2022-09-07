import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarketButtons from "../../components/MarketButtons";
import ProfileNavBar from "../../components/ProfileNavBar";
import { userProductViewForOthersStart, fetchUserSingleProductStart, saveCartDetailsStart, fetchUserProductPicturesStart } from "../../store/slices/productsSlice";





const Product = () => {
  const router = useRouter();
 
  const { product } = router.query;


  const dispatch =useDispatch()
  
  const [ATDvalue, setATDvalue] = useState(1)
  const [displayImg, setDisplayImg] = useState(null)
  const singleProduct = useSelector(state => state.products.productViewForOthers);

  const cartSave = useSelector(state => state.products.cartSave)  ;
  
  const imageHandler = (url) =>{
       setDisplayImg(url)
  }
  const  changeATDvalue = (x) => {
        if(x == 1 ){
          setATDvalue(ATDvalue + 1)  
        }
        else if(x == 0 ){
            setATDvalue(ATDvalue - 1)  
          }
    }
  
  useEffect(()=> {
       dispatch(
        userProductViewForOthersStart({
          user_products_unique_id:product ,
        })
       )
  }, [product])
  const singleProductDetails = singleProduct.data.user_product
  if(singleProduct.loading == false){

    const singleProductDetails = singleProduct.data.user_product
  }
  const addToCart = async()=>{
     await  dispatch(saveCartDetailsStart({user_product_id : singleProduct.data.user_product.id , quantity: ATDvalue}));
      router.push("/market/cart")
  } 
  const seeCart =()=>{
    router.push("/market/cart")
  }

  console.log(singleProductDetails)

  return (
    <div>
      {singleProduct.loading == true ? <h2>Loading ...</h2>
      :
      
    <div className="flex flex-col justify-center lg:flex-row">
      <ProfileNavBar />
      <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 px-2 bg-white mx-auto mt-20 shadow py-4 space-y-4">
        <section>
          <MarketButtons />

        </section>


        <div className="relative     flex-col  md:flex-row flex  rounded-xl  w-full h-3/4 bg-white" >
          <div className="flex-1 flex flex-col mt-6" >
                <div className="flex-1  h-[20rem]  " >
                    <img className="  h-[17rem]  w-3/4" src={displayImg ? displayImg  : singleProductDetails.picture} alt="" />
                </div>   
          
          <div className="flex flex-wrap mt-[2rem]   w-3/4	 " >
            { singleProductDetails.user_product_pictures  &&    singleProductDetails.user_product_pictures.map((data, i) =>{
               return(
                <div key={i} className=" ml-[1rem] w-[4rem] h-[4rem] ">
                      
                 <img src={data.picture} 
                 onClick={()=> imageHandler(data.picture)}
                 className="w-full h-full hover:cursor-pointer rounded-lg hover:border-black hover:border hover:border-[2px]" 
                 alt="" />             
                </div>
               )
            })}
          </div>
  
                    
                </div>

                <div className="flex-1 my-auto mx-auto  md:mx-0">
                    <h1 className="text-2xl font-bold  mb-2" >{singleProductDetails.name}</h1>
                    <hr className="m-2 bg-black w-16 mb-4" />
                 
                 

                    <p className="text-lg mb-4 text-stone-600">{singleProductDetails.description}</p>
                
               

                    <h3 className="text-2xl text-stone-900 font-semibold my-2">{singleProductDetails.user_product_price_formatted}</h3>
                    <p className="text-sm  my-1">AVAILABILITY: <span className="font-semibold"> IN STOCK</span></p>
                    <p className="text-sm my-1">Available Quantity: <span className="font-semibold">{singleProductDetails.quantity}</span></p>
                    <p className="text-sm my-1">Seller: <span className="font-semibold text-red-400">@{singleProductDetails.user.username}</span></p>
                    <p className="text-sm my-1"><span className="text-gray-500 text-lg">
                        &#9733; &#9733; &#9734; &#9734; &#9733;</span></p>

                    <hr className="m-2 bg-black  mb-4" />
                  {singleProductDetails.add_to_cart == 1 ?
                  
                    <div className="flex items-center  ">

                    <div className="w-20 flex h-8">
                        <button onClick={() => changeATDvalue(0)} className="w-2/5 border-1 border-stone-650 h-full bg-stone-400">-</button>
                        <input className="w-3/5 border-1 text-lg font-normal border-stone-650 outline-none m-0 p-0  appearance-none"
                         type='number'
                         min="1"
                         max="60"
                         value={ATDvalue}                   
                         />
                        <button  onClick={() =>changeATDvalue(1)} className="w-2/5 border-1 border-stone-650 h-full bg-stone-400">+</button>
                    </div>
                    <button onClick={addToCart} className="btn ml-2 my-2">Add to Cart</button>
                    </div>
                    :
                    <button  onClick={seeCart} className="btn ml-2 my-2">See Cart</button>

                }

                    <hr className="m-2   mt-4" />
                </div>
            </div>
       
      </div>
    </div>
      }
    </div>
  );
};

export default Product;
