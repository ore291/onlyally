import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/market/CartList";

import MarketButtons from "../../components/MarketButtons"
import ProfileNavBar from "../../components/ProfileNavBar";
import { fetchCartListStart } from "../../store/slices/productsSlice";


const Cart = () => {
  const cartList = useSelector(state => state.products.cartList)
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(fetchCartListStart());
  }, []);

  console.log(cartList)
    return (
            <div className="flex flex-col justify-center lg:flex-row">
              <ProfileNavBar className="w-24 mb-8" />
              <div className="w-full lg:w-4/5 lg:mr-16 mr-0 lg:ml-6 bg-white px-2 md:px-4 mx-auto mt-20 shadow py-4">
                <p className="font-semibold mt1.5 mb-3.5 pl-2"><span  className="mx-2" >Shoopping cart</span>{'>'}<span   className="mx-2">Proceed to Checkout</span>{">"}<span  className="mx-2">Order Completed</span></p>
                <MarketButtons />
                <div className="flex md:flex-row flex-col">

                <CartList/>
                <div className="md:w-1/3 w-3/4 md:mt-32">
                  <div className="border-2 h-[15rem] p-4">


                    <h1 className="text-xl font-semibold mb-4 text-stone-600" >PRICE DETAILS</h1>
                    <div className="flex  justify-between" >
                         <p className="" >Sub Total</p>
                         <p className="">100 token</p>
                    </div>
                    <hr className="my-4 mb-6"/>
                    <hr className="my-4"/>
                    <div className="flex justify-between mb-2" >
                         <p className="" >Total</p>
                         <p className="">100 token</p>
                    </div>

                    <button className="btn mt-4">Proceed to Checkout</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
    )
}


export default Cart