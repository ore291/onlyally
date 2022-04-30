import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import PaymentBody from "../../components/PaymentBody.jsx";

function Payment() {
  return (
    <div>
    <div className="flex p-2 rounded shadow">
      <ProfileNavBar className="w-24 mb-8" />
      <div className=" w-full px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded">
      <p className=" ml-10 mt-4 font-bold">Product</p>
        <PaymentBody />
      </div>
    </div>
  </div>
  )
}

export default Payment;
