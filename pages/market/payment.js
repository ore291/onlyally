import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import PaymentBody from "../../components/PaymentBody.jsx";

function Payment() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className="w-full lg:w-4/5 bg-white dark:!bg-gray-900 dark:!text-gray-400 px-4 mx-auto mt-2  lg:ml-6 shadow py-4">
          <p className=" ml-10 mt-4 font-bold">Product</p>
          <PaymentBody />
        </div>
      </div>
    </div>
  );
}

export default Payment;
