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
    }
  ];
  return (
    <div className="bg-white border drop-shadow-lg width-full rounded-lg space-y-3">
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
                src="/images/person9.jpg"
                alt="Picture of the author"
                width={20}
                height={20}
                className="rounded-full"
              />
              <p>{payment.name}</p>
            </div >
            
            <p>{payment.date}</p>
            <p>{payment.amount}</p>
            <p>{payment.typeData}</p>
          </div>
          <hr />
          </div>
  ))}
      {/* </div> */}
    </div>
  );
}

export default MyPaymentBody;
