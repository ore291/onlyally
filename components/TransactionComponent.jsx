import { GrStatusGood } from  'react-icons/gr';
function TransactionComponent() {
  const tranaction = [
    {
      date: "15 march 2022",
      paymentId: "0-12-3e6376-784",
      mode: " Card",
      amount: "$1660.00",
      delivery: "$0.00",
      taxes: "$0.00",
      total: "$1660.00",
      status: "Success",
      action: "view",
    },

    {
      date: "15 march 2022",
      paymentId: "0-12-3e6376-784",
      mode: " Card",
      amount: "$1660.00",
      delivery: "$0.00",
      taxes: "$0.00",
      total: "$1660.00",
      status: "Success",
      action: "view",
    },
    
    {
      date: "15 march 2022",
      paymentId: "0-12-3e6376-784",
      mode: " Card",
      amount: "$1660.00",
      delivery: "$0.00",
      taxes: "$0.00",
      total: "$1660.00",
      status: "Success",
      action: "view",
    },
    
    {
      date: "15 march 2022",
      paymentId: "0-12-3e6376-784",
      mode: " Card",
      amount: "$1660.00",
      delivery: "$0.00",
      taxes: "$0.00",
      total: "$1660.00",
      status: "Success",
      action: "view",
    },
    
    {
      date: "15 march 2022",
      paymentId: "0-12-3e6376-784",
      mode: " Card",
      amount: "$1660.00",
      delivery: "$0.00",
      taxes: "$0.00",
      total: "$1660.00",
      status: "Success",
      action: "view",
    },

  ];

  return (
    <div>
      <div >

      <div className=" py-2.5 bg-lightPlayRed text-white flex text-[12px] ">
        
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
        
      {tranaction.map((data, index) => (
        <div className="py-2.5 flex items-center  text-[12px] " key={index}>
          <p className="flex justify-center w-[130px] ">{data.date}</p>
          <p className="flex justify-center w-40 ">{data.paymentId}</p>
          <p className="flex justify-center w-[130px] ">{data.mode}</p>
          <p className="flex justify-center w-[130px] ">{data.amount}</p>
          <p className="flex justify-center w-[130px] ">{data.delivery}</p>
          <p className="flex justify-center w-[130px] ">{data.taxes}</p>
          <p className="flex justify-center w-[130px] ">{data.total}</p>
          <p className="flex justify-center w-[130px] "><GrStatusGood className='mt-1 mx-1 text-green-600'/> {data.status}</p>
          <div className="flex justify-center w-[130px]">
          <button className="text-white bg-red-500 py-1 px-5 rounded-md text-[11px]">
            {data.action}
          </button>

          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default TransactionComponent;
