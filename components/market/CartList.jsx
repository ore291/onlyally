import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartDetailsStart,
  saveCartDetailsStart,
} from "../../store/slices/productsSlice";

function CartList({ cart }) {
  const [count, setCount] = useState(cart.quantity);
  const dispatch = useDispatch();

  // quantity increment and decrement button handler
  const handleButtonClick = (action) => {
    if (action == "increase") {
      if (cart.user_product.quantity > count) {
        dispatch(
          saveCartDetailsStart({
            cart_id: cart.cart_id,
            user_product_id: cart.user_product_id,
            quantity: count + 1,
          })
        );
        setCount((prevCount) => prevCount + 1);
      }
    } else if (action == "decrease") {
      if (count > 1) {
        dispatch(
          saveCartDetailsStart({
            cart_id: cart.cart_id,
            user_product_id: cart.user_product_id,
            quantity: count - 1,
          })
        );
        setCount((prevCount) => prevCount - 1);
      }
    }
  };

  //remove product from car handler

  const removeCart = () => {
    dispatch(removeCartDetailsStart({ cart_id: cart.cart_id }));
  };

  console.log(cart);
  return (
    <>
      {cart.user_product && (
        <tbody>
          <tr>
            <td>
              <div className="flex w-[7rem]  justify-center">
                <img
                  src={
                    cart.user_product ? cart.user_product.picture : "/npi.png"
                  }
                  className="object-cover h-28 w-[6rem] rounded-2xl"
                  alt="image"
                />
              </div>
            </td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">
              {cart.user_product.name}
            </td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">
              <div className="w-20 flex h-8">
                <button
                  onClick={(cart) => handleButtonClick("decrease")}
                  className="w-2/5 border-1 border-stone-650 h-full bg-stone-400"
                >
                  -
                </button>
                <input
                  className="w-3/5 border-1 text-lg font-normal border-stone-650 outline-none m-0 p-0  appearance-none"
                  type="number"
                  min="1"
                  max="67"
                  value={cart.quantity}
                />
                <button
                  onClick={(cart) => handleButtonClick("increase")}
                  className="w-2/5 border-1 border-stone-650 h-full bg-stone-400"
                >
                  +
                </button>
              </div>
            </td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">
              {cart.sub_total_formatted}
            </td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">
              <button
                onClick={removeCart}
                className="px-4 py-2 hover:bg-gray-300 font-semibold bg-gray-200"
              >
                {" "}
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default CartList;
