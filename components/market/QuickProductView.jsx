import Link from "next/link";
import { useState } from "react";
import {ImCross} from "react-icons/im"
import { useDispatch } from "react-redux";


const QuickProductView = ({toggleShowQuickView,  productInfo}) => {
    const [ATDvalue, setATDvalue] = useState(1)
    const dispatch = useDispatch()

    const  changeATDvalue = (x) => {
        if(x == 1 ){
          setATDvalue(ATDvalue + 1)  
        }
        else if(x == 0 ){
            setATDvalue(ATDvalue - 1)  
          }
    }

    const addToCart =()=>{
      dispatch(saveCartDetailsStart({user_product_id:productInfo.productInfo.unique_id, quantity: ATDvalue}));
    } 
    return(
        <div  className="fixed left-0   z-30 flex justify-center  items-center top-0 w-screen h-screen bg-[#00000076]">
            <div className="relative     flex-col  md:flex-row flex  rounded-xl  md:w-3/5 md:h-2/3 w-full h-3/4  bg-white" >
            <div onClick={toggleShowQuickView} className="absolute hover:scale-105 cursor-pointer top-4 right-4  border-2 p-2 rounded-full" >
                <ImCross className="" size="13" />
            </div>
                <div className="flex-1 flex justify-center items-center" >
                    <img className=" w-2/3 h-3/4 " src={productInfo.productInfo.picture} alt="" />
                </div>
                <div className="flex-1 my-auto mx-auto  md:mx-0">
                    <h1 className="text-2xl font-bold  mb-2" >{productInfo.productInfo.name}</h1>
                    <hr className="m-2 bg-black w-16 mb-4" />
                 
                    <Link href={`/single-product/${productInfo.productInfo.unique_id}`}>

                    <a className="text-sm text-red-400 hover:text-red-600">Show More</a>
                    </Link>
               

                    <h3 className="text-2xl text-stone-900 font-semibold my-2">0.00 token</h3>
                    <p className="text-sm ">AVAILABILITY: <span className="font-semibold"> IN STOCK</span></p>
                    <p className="text-sm">Available Quantity: <span className="font-semibold">{productInfo.productInfo.quantity}</span></p>
                    <hr className="m-2 bg-black  mb-4" />
                    <div className="flex items-center">

                    <div className="w-20 flex h-8">
                        <button onClick={() => changeATDvalue(0)} className="w-2/5 border-1 border-stone-650 h-full bg-stone-400">-</button>
                        <input className="w-3/5 border-1 text-lg font-normal border-stone-650 outline-none m-0 p-0  appearance-none"
                         type='number'
                         min="1"
                         max={productInfo.productInfo.quantity}
                         value={ATDvalue}                   
                         />
                        <button  onClick={() =>changeATDvalue(1)} className="w-2/5 border-1 border-stone-650 h-full bg-stone-400">+</button>
                    </div>
                    <button className="btn ml-2 my-2">Add to Cart</button>
                    </div>

                    <hr className="m-2   mb-4" />
                </div>
            </div>
        </div>
    )
}

export default QuickProductView