import React from "react";

function OrderList() {
  const dataArray = [
    {
      image: "https://i.ibb.co/vJWQbZy/1.jpg",
      item_name: "Pink Dress",
      quantity: "Quantity 1",
      id: "0-12-3e6376-784",
      address: "Kudiu Gati, Hosur Road, Banglone, Kankataka",
      phone: 91346451287,
      amount: "$1629.00",
      action: "view",
    },
    {
      image: "https://i.ibb.co/vJWQbZy/1.jpg",
      item_name: "Stretch Brand",
      quantity: "Quantity 4",
      id: "0-12-3e6376-784",
      address: "Kudiu Gati, Hosur Road, Banglone, Kankataka",
      phone: 91346451287,
      amount: "$1629.00",
      action: "view",
    },
    {
      image: "https://i.ibb.co/vJWQbZy/1.jpg",
      item_name: "Stretch Brand",
      quantity: "Quantity 8",
      id: "0-12-3e6376-784",
      address: "Kudiu Gati, Hosur Road, Banglone, Kankataka",
      phone: 91346451287,
      amount: "$1629.00",
      action: "view",
    },
    {
      image: "https://i.ibb.co/vJWQbZy/1.jpg",
      item_name: "Stretch Brand",
      quantity: "Quantity 12",
      id: "0-12-3e6376-784",
      address: "Kudiu Gati, Hosur Road, Banglone, Kankataka",
      phone: 91346451287,
      amount: "$1629.00",
      action: "view",
    },
    {
      image: "https://i.ibb.co/vJWQbZy/1.jpg",
      item_name: "Stretch Brand",
      quantity: "Quantity 4",
      id: "0-12-3e6376-784",
      address: "Kudiu Gati, Hosur Road, Banglone, Kankataka",
      phone: 91346451287,
      amount: "$1629.00",
      action: "view",
    },
    {
      image:
        "https://images.pexels.com/photos/6752172/pexels-photo-6752172.jpeg?cs=srgb&dl=pexels-rachel-claire-6752172.jpg&fm=jpg",
      item_name: "Stretch Brand",
      quantity: "Quantity 24",
      id: "0-12-3e6376-784",
      address: "Kudiu Gati, Hosur Road, Banglone, Kankataka",
      phone: 91346451287,
      amount: "$1629.00",
      action: "view",
    },
  ];

  return (
    <div className="">
      <div className="p-2.5 bg-lightPlayRed  text-white flex justify-between text-[12px]">
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
        {dataArray.map((data, index) => (
          <div
            key={index}
            className="flex justify-between space-x-[4.5rem] mr-20  space-y-3 text-[12px]"
          >
            {console.log("data", data)}
            <div className="flex justify-between items-center text-[10px] space-x-3 mt-5 ">
              {/* <div className="p-2.5 flex justify-between text-[12px]"> */}
              <img
                src={data.image}
                alt="Order image"
                className="w-32 h-[100px] "
              />

              <div className="flex flex-col justify-center items-center">
                <p>{data.item_name}</p>
                <p>{data.quantity}</p>
              </div>
            </div>
            <div className="flex justify-between items-center space-x-[4.5rem] ">
              <p>{data.id}</p>
              <p className="w-20">{data.address}</p>
              <p>{data.phone}</p>
              <p>$0.00</p>
              <button className="text-white bg-red-500 py-1 px-5 rounded-md text-[11px]">
                {data.action}
              </button>
            </div>
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
