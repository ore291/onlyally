import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex ">
      <div className="flex">
        <h1 className="italic font-bold text-red-500">L</h1>
        <h1 className="italic font-bold text-red-500">o</h1>
        <h1 className="italic font-bold text-red-500">a</h1>
        <h1 className="italic font-bold text-red-500">d</h1>
        <h1 className="italic font-bold text-red-500">i</h1>
        <h1 className="italic font-bold text-red-500">n</h1>
        <h1 className="italic font-bold text-red-500">g</h1>
      </div>
      <motion.div
        className="w-[10px] h-[10px] rounded-[50px] bg-red-500 m-2.5"
        animate={{ y: "20px" }}
        transition={{
          delay: 0,
          type: "spring",
          duration: 3,
          bounce: 0.2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="w-[10px] h-[10px] rounded-[50px] bg-red-500 m-2.5"
        animate={{ y: "20px" }}
        transition={{
          delay: 1,
          type: "spring",
          duration: 2,
          bounce: 0.2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="w-[10px] h-[10px] rounded-[50px] bg-red-500 m-2.5"
        animate={{ y: "20px" }}
        transition={{
          delay: 2,
          type: "spring",
          duration: 1,
          bounce: 0.2,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default Loading;
