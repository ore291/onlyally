import MarketBody from "../../components/MarketBody"
import MarketButtons from "../../components/MarketButtons"
import ProfileNavBar from "../../components/ProfileNavBar";


const Cart = () => {
    return (
            <div className="flex flex-col justify-center lg:flex-row">
              <ProfileNavBar className="w-24 mb-8" />
              <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
                <p className="font-semibold mt1.5 mb-3.5 pl-2"><span  className="mx-2" >Shoopping cart</span>{'>'}<span   className="mx-2">Proceed to Checkout</span>{">"}<span  className="mx-2">Order Completed</span></p>
                <MarketButtons />
                <MarketBody />
              </div>
            </div>
    )
}


export default Cart