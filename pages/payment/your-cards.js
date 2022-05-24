import Image from "next/image";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import { MdOutlineAutoDelete } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";

function CardPayment() {
  const cardDetails = [
    {
      cardNumber: "xxxx xxxx xxxx 4242",
      type: "Visa",
      markAs: "marks As Default",
    },
    {
      cardNumber: "xxxx xxxx xxxx 4242",
      type: "Visa",
      markAs: "marks As Default",
    },
    {
      cardNumber: "xxxx xxxx xxxx 4242",
      type: "Visa",
      markAs: "marks As Default",
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        {" "}
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" bg-white  mx-auto mt-10 mr-0 lg:mr-16 ml-0 lg:ml-6 shadow py-4 px-8 block ">
          <p className=" ml-10 mt-4 font-bold flex justify-center ">
            Your Card
          </p>
          <hr />
          <div className="block lg:flex flex-wrap gap-8 mt-8 space-y-4">
            {cardDetails.map((card, index) => (
              <div
                className="w-full lg:w-1/3 h-fit shadow-md shadow-gray-200 hover:bg-gray-50 border border-gray-300 space-y-3 rounded-lg p-3 "
                key={index}
              >
                <p className="text-[16px] font-bold ">{card.cardNumber}</p>
                <p className="font-semibold  text-[13px] text-gray-600">
                  {card.type}
                </p>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <p className="font-semibold text-[#3BB9FF] text-[13px] mt-1">
                      {card.markAs}
                    </p>
                    <MdOutlineAutoDelete className="text-[30px] text-gray-600 font-light" />
                  </div>
                  <BsCreditCard2Front className="text-[30px] text-gray-400" />
                </div>
              </div>
            ))}
            <div className="w-full lg:w-1/3 h-fit shadow-md shadow-gray-200 hover:bg-gray-50 border border-gray-300 rounded-lg p-2 ">
              <div className="flex flex-col justify-center items-center space-y-2 ">
                <Image
                  src="/images/Illustration/add a card.jpg"
                  alt="Picture of the author"
                  className=""
                  width={70}
                  height={80}
                />
                <p className="font-bold text-gray-400">Add Card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPayment;
