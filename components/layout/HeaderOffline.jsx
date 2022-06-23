import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";


const HeaderOffline = () => {

    const router = useRouter()

    return (
        <div className="bg-[#B30D28] w-full fixed z-40 shadow-sm border-b">
          <div className="max-w-6xl mx-auto p-2 md:py-2 md:px-0 flex items-center justify-between">
            <div className="relative w-32 h-10 cursor-pointer">
              <Image src="/logo.png" objectFit="contain" layout="fill" alt="" />
            </div>
  
            <div>
              {router.pathname === "/login" ? (
                <div
                  onClick={() => router.push("/register")}
                  className="  w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer"
                >
                  <span className="font-semibold text-white">Register</span>
                </div>
              ) : (
                <div
                  onClick={() => router.push("/login")}
                  className="w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer"
                >
                  <span className="font-semibold text-white">Login</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}

export default HeaderOffline