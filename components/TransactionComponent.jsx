import { useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { ordersListForOthersStart } from "../store/slices/productsSlice";
import Link from "next/link";

function TransactionComponent() {

  const ordersListForOthers  = useSelector(state => state.products.ordersListForOthers)
  const dispatch = useDispatch()



 useEffect(() => {
   dispatch(ordersListForOthersStart());
 }, []);


 const  ordersList = ordersListForOthers.data.orders



  return (
    <div>
      <div>
        <div className=" py-2.5 bg-gray-200 text-black font-semibold flex text-[12px] ">
          <p className="flex justify-center w-[130px] ">Date</p>
          <p className="flex justify-center w-40 ">Payment Id</p>
          <p className="flex justify-center w-[130px] ">Mode</p>
          <p className="flex justify-center w-[130px] ">Amount</p>
          <p className="flex justify-center w-[130px] ">Delivery Fee</p>
          <p className="flex justify-center w-[130px] ">Taxes</p>
          <p className="flex justify-center w-[130px] ">Total</p>
          <p className="flex justify-center w-[130px] ">Status</p>
          <p className="flex justify-center w-[130px] ">Action</p>
        </div>

        {ordersList  && ordersList.map((data, index) => (
          <div className="py-2.5 flex items-center  text-[12px] " key={index}>
            <p className="flex justify-center w-[130px] ">{data.order_payment.paid_date_formatted}</p>
            <p className="flex justify-center w-40 ">{data.order_payment.payment_id}</p>
            <p className="flex justify-center w-[130px] ">{data.order_payment.payment_mode}</p>
            <p className="flex justify-center w-[130px] ">{data.order_payment.sub_total_formatted}</p>
            <p className="flex justify-center w-[130px] ">{data.order_payment.delivery_price_formatted}</p>
            <p className="flex justify-center w-[130px] ">{data.order_payment.tax_price_formatted}</p>
            <p className="flex justify-center w-[130px] ">{data.total_formatted}</p>
            <p className="flex justify-center w-[130px] ">
              <GrStatusGood className="mt-1 mx-1 text-green-600" />{" "}
              {data.order_payment.status ==1 ? 'success' : "pending"}
            </p>
            <div className="flex justify-center w-[130px]">
            <Link href={`/order-view/${data.unique_id}`}   >

              <button className="text-white bg-red-500 py-1 px-5 hover:bg-red-700 rounded-md text-[11px]">
                {"view"}
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionComponent;
