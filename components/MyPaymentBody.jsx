import Image from "next/image";

function MyPaymentBody() {
  const paymentDetails = [
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
    {
      name: "John Doe",
      date: "15 march 2022",
      amount: "$1660.00",
      typeData: "Tip",
    },
  ];
  return (
    <div className="space-y-7">
      <div className="h-[85%] bg-white width-full rounded-lg space-y-3">
        <div className="grid grid-cols-4 justify-items-center	text-[13px] text-lightPlayRed font-bold">
          <p>Paid to</p>
          <p>Date</p>
          <p>Amount</p>
          <p>Type</p>
        </div>
        <hr />
        {/* <div> */}
        {paymentDetails.map((payment, index) => (
          <div className="space-y-2" key={index}>
            <div className="grid grid-cols-4 justify-items-center	text-[13px]">
              <div className="flex justify-center space-x-2">
                <Image
                  src="/images/person 9.jpg"
                  alt="Picture of the author"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <p>{payment.name}</p>
              </div>

              <p>{payment.date}</p>
              <p>{payment.amount}</p>
              <button className="text-white bg-lightPlayRed w-[50%] rounded-md font-semibold">
                {payment.typeData}
              </button>
            </div>
            <hr />
          </div>
        ))}
        {/* </div> */}
      </div>
      <div className="flex justify-center space-x-5 font-semibold text-lightPlayRed">
        <div className="flex justify-center space-x-2.5">
          <p className="text-white bg-lightPlayRed px-[7px]  rounded-md font-semibold">1</p>
          <p>2</p>
        </div>
        <p>Next</p>
      </div>
    </div>
  );
}

export default MyPaymentBody;
