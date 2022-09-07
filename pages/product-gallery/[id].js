import  ProfileNavBar from "../../components/ProfileNavBar.jsx"
import MarketButtons from "../../components/MarketButtons.jsx";
import { useRouter } from "next/router";
import ProductGallery from "../../components/market/ProductGallery.jsx";

function PictureGallery() {
  const router = useRouter();
   const { id }  = router.query
 console.log(router)
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <MarketButtons />
          <p className="font-semibold ml-10 mt-4">Add Products</p>
          <ProductGallery  id = {id}/>
        </div>
      </div>
    </div>
  );
}

export default PictureGallery;
