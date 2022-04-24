import { BiPaperPlane } from 'react-icons/bi'
import Image from 'next/image';

function SubscribeBody() {
  const paymentDetails = [
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "cancalled",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "pacancelled",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "cancalled",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
    {
      paid: "paid",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active"
    },
  ];
  return (
    <div className="space-y-7">
      <div className="h-[85%] bg-white width-full border rounded-lg space-y-3 shadow-lg ">
        {paymentDetails.map((payment, index) => (
          <div className="space-y-2" key={index}>
            <div className="grid grid-cols-5 justify-items-center	text-[13px]">
              <div className="flex justify-center space-x-2">
                <span className='flex justify-center space-x-2 text-lightPlayRed'>
                <p >{payment.paid} </p>
                <BiPaperPlane /> 
                </span>
              </div>
              <p>{payment.date}</p>
              <p>{payment.interval}</p>
              <p>{payment.end}</p>
              <button className="text-white bg-green-600 text-10 px-1 rounded-md font-semibold">
              <p>{payment.status}</p>
              </button>
            </div>
            <hr />
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default SubscribeBody
