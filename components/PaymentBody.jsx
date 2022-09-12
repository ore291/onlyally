import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartListStart, fetchDeliveryAddressStart, ordersPaymentByPaystackStart, ordersPaymentByWalletStart } from "../store/slices/productsSlice";
import PaymentModal from "./helpers/PaymentModal";
import ProductPaymentModal from "./helpers/ProductPaymentModal";
import Link from "next/link";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import { notify } from "reapop";





function ProfileBody() {
 

const   cartList =useSelector(state => state.products.cartList)
const   deliveryAddress =useSelector(state => state.products.deliveryAddress)
const   wallet  =useSelector(state => state.wallet.walletData)
const  cards = useSelector(state => state.cards.cardDetails)
const   ordersPayment =useSelector(state => state.products.ordersPayment)

console.log(ordersPayment)

const dispatch = useDispatch()

const [selectedPayment, setSelectedPayment] = useState("paystack");
const [selectedCard, setSelectedCard] = useState(null);
const [selectedAddress, setSelectedAddress] = useState(null)
const [isDefaultAddress, setIsDefaultAddress] = useState(false);
const [newAddressInputData, setNewAddressInputData] = useState({
  name : "",
  contact_number : "",
  address : "",
  landmark :12345,
  pincode : 12345,
  state: "" ,

});



const [addWalletAmountModal, setAddWalletAmountModal] = useState(false);

const closeAddWalletAmountModal = () => {
  setAddWalletAmountModal(false);
};



const handleDeliveryAddressSelect = (address) => {
  setSelectedAddress(address);
  setNewAddressInputData({
    name : "",
    contact_number : "",
    address : "",
    landmark :"",
    pincode : "",
    state : ""
  })
}
//address form  handler
const handleAddressInputChange = (event) => {
  setNewAddressInputData({
    ...newAddressInputData,
    [event.target.name]: event.target.value,
  });

  if(event.target.value.length > 0 ){
    setSelectedAddress(null)
  }
};

//paystack payment functions

const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  setTimeout(() => {
    const formdata = getFormData();
    dispatch(
      ordersPaymentByPaystackStart({
        payment_id: reference.reference,
        // post_id:
        //   props.post_id != undefined || props.post_id != null
        //     ? props.post_id
        //     : "",
        amount:cartList.data.total_amount,
        user_id:cartList.data.carts[0].user_product.user_id,
        pro_balance: true,
        carts_ids :(cartList.data.carts) ?   cartList.data.carts[0].cart_id  : "",
        ...formdata
      })
    );
  }, 1000);

};

//config
const email = getCookie("user_email")

const [config, setConfig] = useState({
  reference: new Date().getTime().toString(),
  email: email,
  amount:(cartList.data.total_amount * 100),
  publicKey: "pk_test_e6d9a7801826c67298efbedbd115e8c04cf02144",
});


const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  dispatch(
    notify({
      message: "Payment cancelled please try again..",
      status: "error",
    })
  );
};

//payment initialization

const initializePayment = usePaystackPayment(config)



const handleAddressCheckboxChange = () => {
  setIsDefaultAddress(!isDefaultAddress);
};

useEffect(() => {
  setNewAddressInputData({
    ...newAddressInputData,
    is_default: isDefaultAddress ? 1 : 0,
  });
}, [isDefaultAddress]);

useEffect(() => {
  dispatch(fetchCartListStart());
  dispatch(fetchDeliveryAddressStart());
 }, []);

 useEffect(() => {
    cartList.data && setConfig(
      {
        ...config, 
        amount: cartList.data.total_amount * 100
      }
    )
 }, [cartList])



 //get form data handler


const getFormData = () => {
  let formdata = {
    cart_ids:
      !cartList.loading &&
     cartList.data.carts.map((cart) => cart.cart_id).toString(),
  };

  if (selectedAddress != null) {
    formdata = {
      ...formdata,
      delivery_address_id: selectedAddress.delivery_address_id,
    };
  } else {
    formdata = {
      ...formdata,
      ...newAddressInputData,
    };
  }

  return formdata;
};


const handleSubmit = (event) => {
  event.preventDefault();

  const formdata = getFormData();
 console.log(formdata)
  switch (selectedPayment) {
    case "card": {
      dispatch(ordersPaymentByCardStart({ ...formdata }));
      break;
    }
    case "paystack": {
      break;
    }
    case "wallet": {
      dispatch(ordersPaymentByWalletStart({ ...formdata }));
      break;
    }
    default:
      return null;
  }
};


const changePaymentMethod = (payment) => {
  setSelectedPayment(payment)
}
 


  // console.log(cartList)

  // console.log(deliveryAddress)
  // console.log( wallet)

  return (
    <div className="block lg:flex w-full space-x-5">
      <div className="mt-6 p-2 rounded-md w-full lg:w-[48%] lg:ml-3 flex flex-col justify-center space-y-5">
      <div className="flex flex-wrap gap-2">
      {deliveryAddress.data.delivery_addresses  && deliveryAddress.data.delivery_addresses.map((data, i)=> {
            return(     
            
          <label  

            htmlFor="inline-radio-1" 

            onClick={() =>
              handleDeliveryAddressSelect(data)
            }
            key={i}
            className="flex justify-center flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>{data.contact_number}</p>
              <p>{data.state}</p>
              <p>{data.address}</p>
            </div>
            <div>
              <input
                type="radio"
                id={`inline-radio-${i + 1}`}
                checked={
                  selectedAddress != null &&
                  selectedAddress.delivery_address_id ==
                    data.delivery_address_id
                    ? true
                    : false
                }
                className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
              />
            </div>
          </label>
            )  

      })}

        
        


          
        </div>

        {/* input fealds  */}

        <div className="mt-6 p-2 rounded-md w-full ">
          <div className="">
            <p className="mb-2">Shipping address</p>
            <form action="" className="flex flex-col justify-center space-y-6 ">
              <div className="flex flex-col w-full justify-center ">
                <input
                  type="text"
                  name="name"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Name"
                  onChange={event => handleAddressInputChange(event)}
                />
              </div>

              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="contact_number"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Contact Number"
                  onChange={event => handleAddressInputChange(event)}
                />
              </div>

              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="address"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Address"
                  onChange={event => handleAddressInputChange(event)}
                />
              </div>

              

             
              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="state"
                  className="w-[100%] h-[27px] border-white shadow-gray-300 shadow-md rounded text-[10px] outline-none"
                  placeholder="State"
                  onChange={event => handleAddressInputChange(event)}
                />
              </div>

              <div className="flex flex-row w-full justify-start  items-center space-x-2">
                <input
                  type="checkbox"
                  className=" font-medium"
                  id="saveInfo"
                  name="is_default"
                  defaultChecked={isDefaultAddress}
                  onChange={(event) => handleAddressCheckboxChange(event)}
                />
                <div
                   htmlFor="saveInfo"
                  className="text-[10px] font-medium">
                  Save the information for next time{" "}
                </div>
              </div>
            </form>
          </div>
        </div>


        <div className="w-auto shadow-sm rounded grid grid-cols-2 gap-x-5 gap-y-2">
          {/* <div   onClick={() => changePaymentMethod("card")} className="flex  cursor-pointer justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
            <label
                            
                           htmlFor="inline-radio-1"                      
                          >Card</label>
            </div>
            <div>
              <input
                type="radio"
                id="inline-radio-1"
                checked={selectedPayment == "card" ? true : false}
                className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
              />
            </div>
          </div> */}

          <div   onClick={() => changePaymentMethod("wallet")} className="flex cursor-pointer justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
            <label                        
                    htmlFor="inline-radio-2"                 
                     >Wallet</label>
            </div>
            <div>
              <input
                type="radio"
                id="inline-radio-2"
                checked={selectedPayment == "wallet" ? true : false}
                className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>

          <div onClick={() => changePaymentMethod("paystack")}  className="flex  cursor-pointer justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
            <label                      
                            htmlFor="inline-radio-3"
                            className="form-check-label"          
                          >Paystack</label>
            </div>
            <div>
              <input
                type="radio"
                id="inline-radio-3"
                checked={selectedPayment == "paystack" ? true : false}
                className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>
        </div>
       {selectedPayment == "wallet" 
       
       &&
       <>
        <div className="w-auto shadow-md border rounded ">
          <div className="p-2.5 flex space-x-2">
            <p className="font-bold text-[10px]"> Wallat Balance : {wallet.data.user_wallet.remaining_formatted}</p>
            <Link
                  href="/payment/wallet"
                  className="withdraw-money-btn"
                  passHref
            >
            <p className="bg-blue-600  cursor-pointer text-white py-[1px] px-2 text-[8px]">
              Add Wallet Amount
            </p>
            </Link>
          </div>
        </div>
        <div className="space-x-2">
          <button onClick={event => handleSubmit(event)} className="text-white bg-red-500 py-1.5 px-3.5 rounded-full">
            Pay Now
          </button>
          <Link  href="/market/cart" >
          <button className="text-red-500 bg-white-500 py-1.5 px-3.5 rounded-full border">
            Go back to cart
          </button>
          </Link>
        </div>
       </>
       }
      {selectedPayment == "paystack"  
      
      &&

      <>
        <div className="flex justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
          {/* <div className="text-gray-600 text-[10px] ml-2 font-medium ">
            <p>Xavier</p>
            <p>XXXX XXXX XXXX 4242</p>
          </div>
          <input
            type="radio"
            checked="checked"
            className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
          /> */}
        </div>
        <div className="space-x-2">
          <button    className="text-white bg-red-500 py-1.5 px-3.5 rounded-full"
             onClick={() => {
              initializePayment(onSuccess, onClose);
            }}
          >
            Pay Now
          </button>
          <Link  href="/market/cart" >
          <button className="text-red-500 bg-white-500 py-1.5 px-3.5 rounded-full border">
            Go back to cart
          </button>
          </Link>
        </div>
      </>
      }
      </div>

      <div className=" shadow-md shadow-gray-300 rounded-md w-full lg:w-[48%] px-3  mt-6 p-2 h-[100%] space-y-4 ">
        <div className="">
  {cartList.loading == false && cartList.data.carts.map((cart, i) => {
   return(
     <>
     
               <div className="flex justify-between items-center  mb-[1rem]">
                 <div className="flex space-x-3">
                   <img
                     src={cart.user_product.picture}
                     alt="Order image"
                     className="w-[5rem] h-[5rem] flex justify-start rounded-full"
                   />
                   <p className="text-[10px] flex items-center">{cart.user_product.name}</p>
                 </div>
                 <p className="font-bold">{cart.user_product.user_product_price_formatted}</p>
               </div>
                 <hr className="w-full mt-2 " />
            </>
   )
  })}
       

      
        </div>

        <hr className="w-full mt-2 " />

        <div className="">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px]">
              <p>Sub Total </p>
              <p className="font-bold">{cartList.data.sub_total_formatted}</p>
            </div>
            <div className="flex justify-between text-[12px]">
              <p>Shipping</p>
              <p className="font-bold">Calculate at next step</p>
            </div>
          </div>
        </div>
        <hr className="w-full mt-2" />
        <div className="flex justify-between text-[15px] my-5 ">
          <p>Total</p>
          <p className="font-bold">{cartList.data.total_formatted}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
