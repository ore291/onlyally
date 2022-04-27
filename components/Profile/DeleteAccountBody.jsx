import React from "react";

function DeleteAccountBody() {
  return (
    <div className="w-full h-60 shadow-md bg-white mt-8">
      <div className="text-center">
        <h3 className="font-bold">HOPE TO SEE YOU SOON</h3>
        <p>
          Note, ones you delete the account you lose your history and wishlist
          details.
        </p>
        <input
          type="text"
          placeholder="Account Name"
          className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
        />{" "}
      </div>
    </div>
  );
}

export default DeleteAccountBody;
