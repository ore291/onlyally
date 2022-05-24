import { BiPaperPlane } from "react-icons/bi";
import Image from "next/image";

function SubscribeBody() {
  const paymentDetails = [
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      interval: "Monthly",
      end: "15 jun 2022",
      status: "Active",
    },
  ];
  return (
    <div className="space-y-7">
      <div className="h-[85%] bg-white width-full rounded-lg space-y-3">
        <div className="grid grid-cols-5 justify-items-center	text-[13px] text-gray-400 font-bold">
          <p>Subscriber</p>
          <p>Date</p>
          <p>Interval</p>
          <p>Ends at</p>
          <p>Status</p>
        </div>
        <hr />
        {/* <div> */}
        {paymentDetails.map((payment, index) => (
          <div className="space-y-2" key={index}>
            <div className="grid grid-cols-5 justify-items-center	text-[13px]">
              <div className="flex justify-center space-x-2">
                <img
                  src="/images/person 9.jpg"
                  alt="Picture of the author"
                  className="rounded-full w-1/2 lg:w-1/6 "
                />
                <span className="flex justify-center space-x-2 text-lightPlayRed">
                  <p>{payment.name} </p>
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

export default SubscribeBody;
