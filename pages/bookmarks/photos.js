/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import ProfileNavItem from "../../components/ProfileNavBar";
// import LeftSideBar from "../../components/LeftSideBar";
import { MdPhotoSizeSelectActual } from "react-icons/md";

export default function bookmarks() {
  const images = [
    "person2",
    "person5",
    "person6",
    "person7",
    "person8",
    "person2",
    "person3",
    "person8",
  ];
  return (
    <div className="flex flex-col justify-center lg:flex-row">
      {/* <LeftSideBar className="w-20" /> */}
      <ProfileNavItem />
      <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
        <div className=" bg-white ">
          <div className="py-1 space-y-2">
            <div className="py-3 mx-2 flex space-x-2 ">
              <div className="side-icon ">
                <MdPhotoSizeSelectActual className="text-white h-5 w-5" />
              </div>
              <p className=" m-auto font-semibold">Photos</p>
            </div>
            <hr className="w-full py-3 " />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, i) => (
              <Image
                key={i}
                className="h-48 rounded"
                src={`/images/${image}.jpg`}
                alt={image}
                height={192}
                width={250}
              />
            ))}
            {/* <img src="/public/images/" alt=""> */}
          </div>
        </div>
      </div>
    </div>
  );
}
