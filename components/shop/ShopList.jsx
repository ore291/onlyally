import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { MdClose, MdStarBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductsStart } from "../../store/slices/productsSlice";

// const product = {
//   name: "Basic Tee 6-Pack ",
//   price: "$192",
//   rating: 3.9,
//   reviewCount: 117,
//   href: "#",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
//   imageAlt: "Two each of gray, white, and black shirts arranged on table.",
//   colors: [
//     {
//       name: "White",
//       className: "bg-white",
//       selectedclassName: "ring-gray-400",
//     },
//     {
//       name: "Gray",
//       className: "bg-gray-200",
//       selectedclassName: "ring-gray-400",
//     },
//     {
//       name: "Black",
//       className: "bg-gray-900",
//       selectedclassName: "ring-gray-900",
//     },
//   ],
//   sizes: [
//     { name: "XXS", inStock: true },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "XXL", inStock: true },
//     { name: "XXXL", inStock: false },
//   ],
// };

// function classNames(...classNamees) {
//   return classNamees.filter(Boolean).join(" ");
// }

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 5,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 6,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];

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
                    <div
                      key={product.id}
                      className="group relative cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img
                          src={product.productInfo.picture}
                          alt={"product"}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            {/* href={product.href} */}
                            <p>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.productInfo.name}
                            </p>
                          </h3>
                          {/* <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p> */}
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.productInfo.user_product_price_formatted}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopList;
