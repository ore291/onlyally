import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordersListForOthersStart } from "../store/slices/productsSlice";
import Link from "next/link";

function OrderList() {
  const ordersListForOthers = useSelector(
    (state) => state.products.ordersListForOthers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersListForOthersStart());
  }, []);

  const ordersList = ordersListForOthers.data.orders;
  return (
    <div className="">
      <div className="p-2.5 bg-gray-200  text-black font-semibold flex justify-between text-[12px]">
        <p>Product</p>
        <div className="flex justify-between space-x-[4.5rem] mr-20">
          <p className="mr-7">Order id</p>
          <p>Shipping Address</p>
          <p>Phone Number</p>
          <p>Amount</p>
          <p>Action</p>
        </div>
      </div>
      <div className="">
        {ordersList ? (
          ordersList.map((data, index) => (
            <div
              key={index}
              className="flex mb-4 border-b-2	 justify-between space-x-[4.5rem] mr-20  space-y-3 text-[12px]"
            >
              <div className="flex flex-col w-full   justify-between items-center text-[10px] space-x-3 mt-5 ">
                {data.product_details.map((product, i) => {
                  return (
                    <div key={i} className="flex  m-[0.5rem]">
                      {/* <div className="p-2.5 flex justify-between text-[12px]"> */}
                      <img
                        src={product.picture}
                        alt="Order image"
                        className="w-[5rem] h-[3rem] mx-2 "
                      />

                      <div className="flex flex-col justify-center items-center">
                        <p className="font-normal  text-sm text-gray-600">
                          {product.name}
                        </p>
                        <p>{product.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center space-x-[4.5rem] ">
                <p>{data.unique_id}</p>
                <p className="w-20">{data.delivery_address.address}</p>
                <p>{data.delivery_address.contact_number}</p>
                <p>{data.total_formatted}</p>
                <Link href={`/order-view/${data.unique_id}`}>
                  <button className="text-white bg-red-500 py-1 px-5 rounded-md text-[11px]">
                    view
                  </button>
                </Link>
              </div>
            </div>
            // </div>
          ))
        ) : (
          <h3> Loading ...</h3>
        )}
      </div>
    </div>
  );
}

export default OrderList;
