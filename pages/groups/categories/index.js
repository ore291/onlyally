import React, { useState, useEffect } from "react";
import SideNavLayout from "../../../components/SideNavLayout";
import { fetchGroupsCategoriesStart } from "../../../store/slices/groupsSlice";
import CategoriesLoader from "../../../components/helpers/GridLoader";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

const GroupCategories = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchGroupsCategoriesStart());
  }, []);

  const categories = useSelector((state) => state.groups.categories);

  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto relative">
        {categories.loading ? (
          <div className="w-full h-screen row-container">
            <CategoriesLoader />
          </div>
        ) : (
          <div className="m-1 md:m-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-2 place-content-center items-center justify-items-center align-items-center">
            {categories.data.length > 0 &&
              categories.data.map((category, i) => (
                <div
                  className="relative group rounded-md"
                  key={i}
                  onClick={() =>
                    router.push(`/groups/categories/${category.category_id}`)
                  }
                >
                  <Image
                    className="rounded-lg group-hover:cursor-pointer hover:scale-105 inset-0 hover:bg-blend-darken brightness-50 object-cover"
                    src={
                      category.picture ||
                      "https://playjor.ams3.digitaloceanspaces.com/public/uploads/categories/79532c239073e262897421194f3d8511e4dab589.png"
                    }
                    alt={category.name}
                    height={250}
                    width={isMobile ? 320 : 270}
                    objectFit="cover"
                  />
                  <p className="font-bold text-white text-lg absolute left-3 bottom-4">
                    {category.name}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </SideNavLayout>
  );
};

export default GroupCategories;
