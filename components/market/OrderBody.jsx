import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersViewForOthersStart } from "../../store/slices/productsSlice";



const OrderBody = ({order_id}) => {
    const  ordersViewForOthers = useSelector(state => state.products.ordersViewForOthers) 
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(
          ordersViewForOthersStart({
            order_unique_id: order_id
          })
        );
      }, [order_id]);
   
  
      if(ordersViewForOthers.loading == false){
        const  orderList  = ordersViewForOthers.data.order
        }
        if( ordersViewForOthers.data.order){
            var  orderArray = [ ...orderList.order_product]
        }
      

    return(
        <div className="w-full flex flex-col  md:flex-row my-[2rem]">

            <div className="flex-1 flex flex-col my-[1rem] "  >
        {orderArray  ?  orderArray.map((order, i) =>{
         return(

        
             <div className="w-full shadow-lg my-[1rem] p-[1rem]"  key={i}>
                 {order.user_product_details    &&
               <div className="w-full">
                 <div className="w-full  h-[20%] my-[1.5rem] " >
                     <img src={order.user_product_details.picture} className="w-[13rem] h-[13rem]" alt=""/>
                 </div>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Order ID</p>
                     <p className="flex-1 text-gray-600 text-sm">{orderList.unique_id}</p>
                 </div>
                 <hr className=""/>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Product Name</p>
                     <p className="flex-1 text-gray-600 text-sm">{order.user_product_details.name}</p>
                 </div>
                 <hr className=""/>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Quantity</p>
                     <p className="flex-1 text-gray-600 text-sm">{order.quantity}</p>
                 </div>
                 <hr className=""/>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Per Quantity Price</p>
                     <p className="flex-1 text-gray-600 text-sm">{order.per_quantity_price_formatted}</p>
                 </div>
                 <hr className=""/>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Sub Total Amount </p>
                     <p className="flex-1 text-gray-600 text-sm">{order.sub_total_formatted}</p>
                 </div>
                 <hr className=""/>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Order Date </p>
                     <p className="flex-1 text-gray-600 text-sm">{orderList.order_payment.paid_date}</p>
                 </div>
                 <hr className=""/>
                 <div className="flex  text-start w-full h-[4%] my-[0.5rem] "  >
                     <p className="font-medium text-gray-600 flex-1">Payment Method</p>
                     <p className="flex-1 text-gray-600 text-sm">{orderList.order_payment.payment_mode}</p>
                 </div>
                 
                 <hr className=""/>
                 </div>
                 }
             </div>
     
     )
    })
    :
    <h3>Loading ....</h3>
}
            </div>

           {ordersViewForOthers.loading == false 
            &&   
           
             <div className="md:w-[29rem] mx-[1.5rem] h-fit shadow-lg my-[1rem] p-[2rem]" >
                <div className="flex  text-start w-full h-[5%] my-[1rem] "  >
                     <p className="font-medium  text-gray-600 ">Order Summary</p>
                 </div>
                 <div className="flex  text-start w-full justify-between h-[5%] my-[1rem] "  >
                     <p className=" text-sm text-gray-600 ">Shipping address</p>
                     <p className=" text-gray-700 font-medium text-sm">{orderList.delivery_address.address}</p>
                 </div>
                 <div className="flex  text-start w-full justify-between h-[3%] my-[0.5rem] "  >
                     <p className=" text-sm text-gray-600 ">Order Id</p>
                     <p className=" text-gray-700 font-medium text-sm">{orderList.unique_id}</p>
                 </div>
                 <hr/>
                 <div className="flex text-sm text-start  w-full h-[5%] my-[1rem] "  >
                     <p className="font-medium  text-gray-600 text-sm">Price Details</p>
                 </div>
                 <div className="flex  text-start w-full justify-between h-[4%] my-[1rem] "  >
                     <p className="text-sm text-gray-600">List Price</p>
                     <p className=" text-gray-700 font-medium  text-sm">{orderList.sub_total_formatted}</p>
                 </div>
                 <div className="flex  text-start w-full justify-between h-[4%] my-[1rem] "  >
                     <p className="  text-gray-600 ">Shipping Fee</p>
                     <p className=" text-gray-700 font-medium text-sm">00</p>
                 </div>
                 <div className="flex  text-start justify-between w-full h-[4%] my-[1rem] "  >
                     <p className="text-sm  text-gray-600 ">Taxes</p>
                     <p className="text-gray-700 font-medium text-sm">{orderList.tax_price_formatted}</p>
                 </div>
                 <hr/>
                 <div className="flex  text-start justify-between w-full h-[6%] my-[1rem] "  >
                     <p className=" text-sm font-medium  text-gray-600 ">Total</p>
                     <p className="text-xl font-semibold text-gray-900 ">{orderList.total_formatted}</p>
                 </div>
                 
             </div>
           }

        </div>
    )
}

export default OrderBody