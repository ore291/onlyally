import React from "react";

function DeleteAccountBody() {
  return (
    <div className="w-full h-60 shadow-md bg-white mt-8">
      <div className="text-center">
        <h3 className="font-bold">HOPE TO SEE YOU SOON</h3>
        <p className="text-[12px]">
          Note, ones you delete the account you lose your history and wishlist
          details.
        </p>
      </div>
      <div className="mt-4">
        <label htmlFor="">Passoard</label>
        <input
          type="text"
          placeholder="xxxxxxxx"
          className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 border-gray-300"
        />
      </div>
      <div className="flex justify-center">
      <button className="text-white font-bold bg-gradient-to-r from-pink-500 to-red-600 mt-6 rounded-full py-2 px-[10%]">Delete Account</button>
      </div>
    </div>
  );
}

export default DeleteAccountBody;
