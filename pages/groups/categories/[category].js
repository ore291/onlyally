import React, { useState, useEffect } from "react";
import SideNavLayout from "../../../components/SideNavLayout";
import { useRouter } from "next/router";
import {
  fetchGroupsStart,
  fetchGroupsCategoriesStart,
} from "../../../store/slices/groupsSlice";
import { useSelector, useDispatch } from "react-redux";
import GroupCard from "../../../components/groups/GroupCard";
import GridLoader from "../../../components/helpers/GridLoader";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [categoryData, setCategoryData] = useState(false);

  const { category } = router.query;
  const categories = useSelector((state) => state.groups.categories);

  useEffect(() => {
    dispatch(fetchGroupsCategoriesStart());
  }, []);

  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto relative p-2 md:p-5">
        {categories.loading ? (
          <div className="w-full h-screen row-container">
            <GridLoader />
          </div>
        ) : router.isReady && categories.data.length > 0 ? (
          <>
            <h1 className="text-xl my-2 md:text-3xl font-semibold capitalize">
              {categories.data.find((c) => c.category_id == parseInt(category))
                ?.name || ""}{" "}
              Groups
            </h1>
            {categories.data?.find((c) => c.category_id == parseInt(category))
              ?.groups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 md:m-5 p-0 md:p-5 gap-2">
                {categories.data
                  ?.find((c) => c.category_id == parseInt(category))
                  ?.groups.map((group, index) => (
                    <GroupCard key={index} group={group} catPage={true} />
                  ))}
              </div>
            ) : (
              <div className="w-full h-screen row-container">
                <NoDataFound />
              </div>
            )}
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </SideNavLayout>
  );
};

export default Category;
