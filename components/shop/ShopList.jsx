import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { MdClose, MdStarBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductsStart } from "../../store/slices/productsSlice";
import Product from "../market/Product"

const ShopList = () => {
  const [open, setOpen] = useState(false);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProductsStart());
  }, []);

  return (
    <>
      <div className="bg-white w-full">
        <div className="max-w-2xl mx-auto py-4 px-0 sm:px-2 lg:max-w-7xl ">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Featured Products
          </h2>
          {products.loading ? (
            "Loading..."
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-2">
              {products.data.user_products.length < 1
                ? (
                  <p>No products in shop</p>
                )
                : products.data &&
                  products.data.user_products.map((product) => (
                    <Product productInfo={product} key={product.id} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopList;
