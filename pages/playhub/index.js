import React from "react";
import SideNavLayout from "../../components/SideNavLayout";
import Image from "next/image";

const PlayHub = () => {
  return (
    <SideNavLayout>
      <div
        style={{
          backgroundImage: `url('/playhub/playhub.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
        className="w-full bg-blend-darken bg-black/20 h-[70vh]"
      >
        <div className="flex flex-col space-y-5 items-center text-white" text-center>
          <div className="w-[300px] md:w-[400px] h-[50px] md:h-[100px] mt-5 md:mt-10 relative bg-transparent">
            <Image
              src="/playhub/logo1.png"
              alt="logo"
              className="bg-transparent object-contain"
              layout="fill"
            />
          </div>
          <h1 className="text-2xl md:text-5xl font-medium text-center uppercase">
            movies, series, live shows, music
          </h1>
          <h3 className="text-lg text-center uppercase font-medium ">
            watch and listen to customize contents anywhere
          </h3>
          <div className="my-20 rounded-lg row-container h-12 cursor-pointer bg-[#0185D8] w-40 md:w-60">
            <span className="text-xl md:text-3xl text-gray-200 font-medium">COMING SOON</span>
          </div>
        </div>
      </div>
      <div className="w-full h-screen xx:h-[80vh] md:h-[50vh] relative bg-gradient-to-b from-[#016EB3] via-[#014A76] to-[#032B45]">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full absolute gap-x-10 p-2 md:p-10 -top-40">
              <div className="flex flex-col space-y-3 items-center justify-between py-3 text-white">
                  <div className="w-full rounded-[30px] border-2 border-textPlayRed">
                      <div className="w-full relative h-[250px]">
                            <Image src="/playhub/img1.jpeg" layout="fill" className="rounded-[30px] object-cover" alt="img1"/>
                      </div>
                  </div>
                  <h1 className="text-5xl font-medium">
                      MOVIE
                  </h1>
                  <p className="text-lg font-medium">
                      STREAMING
                  </p>
              </div>
              <div className="flex flex-col space-y-3 items-center justify-between py-3 text-white">
                  <div className="w-full rounded-[30px] border-2 border-textPlayRed">
                      <div className="w-full relative h-[250px]">
                            <Image src="/playhub/img2.jpeg" layout="fill" className="rounded-[30px] object-cover" alt="img1"/>
                      </div>
                  </div>
                  <h1 className="text-5xl font-medium">
                      MUSIC
                  </h1>
                  <p className="text-lg font-medium">
                      STREAMING
                  </p>
              </div>
          </div>
      </div>
    </SideNavLayout>
  );
};

export default PlayHub;
