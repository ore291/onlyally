import SideNavLayout from "../../components/SideNavLayout";
import GroupTabs from "../../components/groups/GroupTabs";
import GroupCard from "../../components/groups/GroupCard";
import GroupTabsMain from "../../components/groups/GroupTabsMain.jsx";
import CategoriesLoader from "../../components/helpers/CategoriesLoader";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchGroupsStart,
  fetchGroupsCategoriesStart,
} from "../../store/slices/groupsSlice";
import GroupCardLoader from "../../components/groups/GroupCardLoader";
import Link from "next/link";
import HeadBodyLoader from "../../components/helpers/HeadBodyLoader";
import NoDataFound from "../../components/NoDataFound/NoDataFound";

const Groups = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupsStart());
    dispatch(fetchGroupsCategoriesStart());
  }, []);

  const groups = useSelector((state) => state.groups.groups);
  const categories = useSelector((state) => state.groups.categories);

  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto xl:max-w-7xl p-0 md:p-5">
        {groups.loading ? (
          <div className="row-container">
            <GroupCardLoader />
          </div>
        ) : groups.data && groups.data.length > 0 ? (
          <GroupTabsMain groupsData={groups} />
        ) : (
          ""
        )}

        <div className="bg-white rounded-2xl my-10 p-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b mb-5">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-2xl font-semibold">Categories</h1>
              <p className="text-sm font-semibold text-gray-500">
                Find a group by browsing top categories.
              </p>
            </div>
            <Link href="/groups/categories" passHref>
              <div className="row-container cursor-pointer">
                <p className="font-semibold text-blue-400 ">See all</p>
              </div>
            </Link>
          </div>
          <div className="p-2 pb-5 flex overflow-x-scroll space-x-3 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
            {categories.loading ? (
              <CategoriesLoader />
            ) : (
              <>
                {categories.data.length > 0 &&
                  categories.data.slice(0, 6).map((category, i) => (
                    <Link
                      key={i}
                      href={`/groups/categories/${category.category_id}`}
                      passHref
                    >
                      <div className="flex-shrink-0 relative group rounded-md">
                        <Image
                          className="rounded-lg group-hover:cursor-pointer inset-0 bg-blend-darken brightness-50 "
                          src="/images/person5.jpg"
                          alt={category.name}
                          height={150}
                          width={170}
                        />
                        <p className="font-bold text-white text-lg absolute left-3 bottom-4">
                          {category.name}
                        </p>
                      </div>
                    </Link>
                  ))}
              </>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-3 my-5">
            <div className="col-span-2">
              {groups.loading  || categories.loading ? (
                <div className="row-container">
                  <HeadBodyLoader />
                </div>
              ) : groups.data && categories.data && groups.data.length > 0 ? (
                <GroupTabs
                  groupsAll={true}
                  groupsData={groups.data}
                  categoriesData={categories.data}
                />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className="grid grid-cols-1 gap-0 md:gap-3">
              <h1 className="text-xl md:text-2xl font-semibold">
                Suggested For You
              </h1>
              {groups.data && groups.data.length > 0 ? (
                <>
                  {groups.data
                    .filter((fgroup) => fgroup.is_member === false)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2)
                    .map((group, index) => (
                      <GroupCard filter={true} key={index} group={group} />
                    ))}
                </>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between pb-2 border-b my-5 ">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-xl md:text-2xl font-semibold">Suggestions</h1>
              <p className="text-sm font-semibold text-gray-500">
                Find a group You Might be interested in.
              </p>
            </div>
            <div className="row-container cursor-pointer">
              <Link href="/groups/categories" passHref>
                <p className="font-semibold text-blue-400 ">See all</p>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-5 p-0 md:p-2 pb-5 max-h-[600px] overflow-y-scroll  scrollbar-thin  scroll-smooth">
            {groups.data
              .filter((fgroup) => fgroup.is_member === false)
              .map((group, index) => (
                <GroupCard key={index} groupsSuggestion={true} group={group} />
              ))}
          </div>
        </div>
      </div>
    </SideNavLayout>
  );
};

export default Groups;
