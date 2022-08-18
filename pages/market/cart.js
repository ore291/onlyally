import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/market/CartList";

import MarketButtons from "../../components/MarketButtons"
import ProfileNavBar from "../../components/ProfileNavBar";
import { fetchCartListStart, removeCartDetailsStart } from "../../store/slices/productsSlice";


const Cart = () => {
  const cartList = useSelector(state => state.products.cartList)
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(fetchCartListStart());
  // )
  }, []);

//delete all cart handler 
const deleteAllCart = () => {
  dispatch(removeCartDetailsStart())
}
  console.log(cartList)
    return (
            <div className="flex flex-col justify-center lg:flex-row">
              <ProfileNavBar className="w-24 mb-8" />
              <div className="w-full lg:w-4/5 lg:mr-16 mr-0 lg:ml-6 bg-white px-2 md:px-4 mx-auto mt-20 shadow py-4">
                <p className="font-semibold mt1.5 mb-3.5 pl-2"><span  className="mx-2" >Shoopping cart</span>{'>'}<span   className="mx-2">Proceed to Checkout</span>{">"}<span  className="mx-2">Order Completed</span></p>
                <MarketButtons />
               
                <div className="flex lg:flex-row flex-col">
                <div className="container  md:w-3/4 md:p-8  mt-12">
    <div className="w-full overflow-x-auto">
      <div className="my-2">
        <h3 className="text-xl font-bold tracking-wider">Shopping Cart 3 item</h3>
      </div>
      <table className="w-full shadow-inner">
        <thead>
          <tr className="bg-gray-100">
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Image</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Product</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Qty</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Price</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Remove</th>
          </tr>
        </thead>
               {cartList.loading == false   && cartList.data.carts.map((cart, i)  => {
                 return(
              
                   <CartList cart={cart} key={i} />  
                 )}
                   
                 )}
               </table>
          <div className="flex w-full justify-between  my-6 mt-8">
            <Link href="/marketplace/market">

            <button className="p-2 rounded-md bg-stone-300">CONTINUE SHOPPING</button>
            </Link>
            {cartList.loading == false && cartList.data.carts.length > 0 ?
            
            <button  onClick={deleteAllCart}  className="btn py-4">REMOVE ALL CART</button>
            :  ""}
          </div>
    
      
    </div>
  </div>   
          
                <div className="md:w-1/3 w-3/4 md:mt-32">
                  <div className="border-2 h-[15rem] p-4">


                    <h1 className="text-xl font-semibold mb-4 text-stone-600" >PRICE DETAILS</h1>
                    <div className="flex  justify-between" >
                         <p className="" >Sub Total</p>
                         <p className="">{cartList.data.sub_total_formatted}</p>
                    </div>
                    <hr className="my-4 mb-6"/>
                    <hr className="my-4"/>
                    <div className="flex justify-between mb-2" >
                         <p className="" >Total</p>
                         <p className="">{cartList.data.total_formatted}</p>
                    </div>
                      <Link href="/market/payment" >

                    <button className="btn mt-4">Proceed to Checkout</button>
                      </Link>
                  </div>
                </div>
                </div>
              </div>
            </div>
    )
}


export default Cart