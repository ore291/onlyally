import { BiPaperPlane } from "react-icons/bi";
import Image from "next/image";

function SubscribeBody() {
  const paymentDetails = [
    {
      paid: "paid",
      amount: "$17.00",
      val: "-",
      fee: "$0,00",
      state: "Add",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "paid",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Paid",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "paid",
      amount: "$0.00",
      val: "-",
      fee: "$0,00",
      state: "Add",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "cancalled",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Credit",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "paid",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Add",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "pacancelled",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Paid",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "paid",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Add",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "paid",
      amount: "$0.00",
      val: "+",
      fee:"$0,00", 
      state: "Credit",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "cancalled",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Add",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
    {
      paid: "paid",
      amount: "$0.00",
      val: "+",
      fee: "$0,00",
      state: "Add",
      from: "Person's name",
      code: "CR3678 CGVAVU7E8 74T8TVCVJVC",
    },
  ];
  return (
    <div className="space-y-7">
      <div className="h-[85%] bg-white width-full border rounded-lg space-y-3 shadow-lg ">
        {paymentDetails.map((payment, index) => (
          <div className="space-y-6" key={index}>
            <div className="flex ">
            <div className="grid grid-cols-5 justify-items-center mt-6	text-[13px] w-[75%]">
              {/* <div className="justify-items-center"> */}

              {/* <BiPaperPlane />  */}
              <p className="m-">{payment.paid} </p>

              <div className="justify-items-center">
                <p className="text-center">{payment.val}</p>
                <p>{payment.amount}</p>
              </div>
              <div>
                <p>Service fee :</p>
                <p className="text-center">{payment.fee}</p>
              </div>
                <p>{payment.state} </p>
              <spam className="justify-items-center">
                  <p className="text-center">From :- </p>
                  <p>{payment.from}</p>
                </spam>
              
            </div>
            <div className="w-[25%] justify-items-center">
                {payment.code}
            </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscribeBody;
