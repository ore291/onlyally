import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  deleteUserProductStart,
  fetchUserProductsStart,
} from "../../store/slices/productsSlice";
import { FiEye } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
function ProductList() {
  const products = useSelector((state) => state.products.products);
  const productDelete = useSelector((state) => state.products.productDelete);
  const dispatch = useDispatch();

  const router = useRouter();

  const { product } = router.query;

  useEffect(() => {
    dispatch(fetchUserProductsStart());
  }, []);

  const productList = products.data.user_products;
  if (products.loading == false) {
    const productList = products.data.user_products;
  }

  const deleteProduct = (id) => {
    dispatch(deleteUserProductStart({ user_product_id: id }));
    router.push("/market/product-list");
  };
  return (
    <div className="">
      <div className="p-2.5 bg-gray-200  text-black font-semibold flex justify-between text-[12px]">
        <p className="flex-1">Product Image</p>
        <p className="flex-1">Product details</p>
        <p className="flex-1">Prices</p>
        <p className="flex-1">Quantity</p>
        <p className="flex-1">In stock</p>
        <p className="flex-1">Action</p>
      </div>

      <div className="">
        {productList ? (
          productList.map((data, index) => (
            <div
              key={index}
              className="flex mb-4 border-b-2 p-2.5 justify-between    space-y-3 text-[12px]"
            >
              <div className="flex-1 flex">
                {/* <div className="p-2.5 flex justify-between text-[12px]"> */}
                <img
                  src={data.picture}
                  alt="Order image"
                  className="w-[7rem] h-[7rem] mx-2 "
                />
              </div>

              <p className="flex-1">{data.name}</p>
              <p className="flex-1">{data.user_product_price_formatted}</p>
              <p className="flex-1">{data.quantity}</p>
              <p className="flex-1">{data.is_visible == 1 ? "Yes" : "No"}</p>
              <div className="flex  flex-1 flex-col ">
                <div className="flex  w-[80%] justify-around text-gray-400">
                  <ImCross
                    onClick={() => deleteProduct(data.user_product_id)}
                    className="cursor-pointer  hover:text-gray-500"
                    size="20"
                  />
                  <Link href={`/single-product/${data.unique_id}`}>
                    <FiEye
                      className="cursor-pointer  hover:text-gray-500"
                      size="23"
                    />
                  </Link>
                  <Link href={`/edit-product/${data.unique_id}`}>
                    <FaEdit
                      className="cursor-pointer  hover:text-gray-500s"
                      size="20"
                    />
                  </Link>
                </div>
                <Link href={`/order-view/${data.unique_id}`}>
                  <button className="  text-white bg-red-500 my-1 py-2 px-6 w-[80%] rounded-md text-[11px]">
                    View Orders
                  </button>
                </Link>
                <Link href={`/product-gallery/${data.user_product_id}`}>
                  <button className="text-white bg-red-500 my-1 py-2 px-6 w-[80%] rounded-md text-[11px]">
                    Gallery
                  </button>
                </Link>
              </div>
            </div>
            // </div>
          ))
        ) : (
          <h3> Loading ...</h3>
        )}
      </div>
    </div>
  );
}

export default ProductList;
