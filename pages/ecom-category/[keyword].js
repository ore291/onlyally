import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons.jsx";
import EditProduct from "../../components/market/EditProduct";
import { useRouter } from "next/router";
import EcomCategory from "../../components/EcomCategory";

function EcomCategoryPage() {
  const router = useRouter();
 
  const { keyword } = router.query;
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <MarketButtons />
          <p className="font-semibold ml-10 mt-4">Product</p>
          <EcomCategory />
        </div>
      </div>
    </div>
  );
}

export default EcomCategoryPage;
