import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import CategoryListingTabLoader from "./CategoryListingTabLoader";
import CategoryListingLoader from "./CategoryListingLoader";
import UserCard from "../userProfile/UserCard";
import { FaChevronDown } from "react-icons/fa";
import {
  fetchUserCategoryListStart,
  fetchContentCreatorListStart,
} from "../../store/slices/userCategory";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CategoryListingIndex = () => {
  const dispatch = useDispatch();
  const [selectedList, setSelectedList] = useState(null);
  const userCategory = useSelector((state) => state.userCategory);

  useEffect(() => {
    dispatch(fetchUserCategoryListStart());
    dispatch(fetchContentCreatorListStart());
  }, []);

  const handleCreatorChange = (id) => {
    setSelectedList(id);
    dispatch(fetchContentCreatorListStart({ category_id: id }));
  };

  const handleListClear = () => {
    setSelectedList(null);
    dispatch(fetchContentCreatorListStart());
  };

  return (
    <>
      {userCategory.categoryList.loading ? (
        <CategoryListingTabLoader />
      ) : (
        <Tab.Group>
          {userCategory.categoryList.data &&
          userCategory.categoryList.data.length > 0 ? (
            <>
              <Tab.List className="flex space-x-4 overflow-x-scroll md:overflow-hidden scrollbar-track-black scrollbar-thin scroll-smooth  mb-4 pb-4">
                {userCategory?.categoryList.data.map((list, index) => (
                  <Tab
                    key={index}
                    onClick={() => handleCreatorChange(list.u_category_id)}
                    className={({ selected }) =>
                      classNames(
                        "w-[150px] shrink-0 rounded-lg py-2.5 text-sm font-medium leading-5 bg-gray-100 shadow-lg",

                        selected
                          ? "bg-lightPlayRed/90 text-white"
                          : "bg-white text-lightPlayRed"
                      )
                    }
                  >
                    {list.name}
                  </Tab>
                ))}
                {selectedList != null && (
                  <button
                    onClick={handleListClear}
                    className="w-[150px] shrink-0 rounded-lg py-2.5 text-sm font-medium leading-5 bg-white shadow-lg"
                  >
                    Show All
                  </button>
                )}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="w-full">
                    <h4 className="font-semibold text-lg  mb-4">
                      THE BEST CREATORS OF LAST WEEK
                    </h4>
                    {userCategory.contentCreatorList.loading ? (
                      <CategoryListingLoader />
                    ) : (
                      <>
                        {userCategory.contentCreatorList.data.content_creators
                          .length > 0 ? (
                          <>
                            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {userCategory.contentCreatorList.data.content_creators.map(
                                (creator, index) => (
                                  <UserCard key={index} creator={creator} />
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4>No creator Found</h4>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="w-full">
                    <h4 className="font-semibold text-lg  mb-4">
                      THE BEST CREATORS OF LAST WEEK
                    </h4>
                    {userCategory.contentCreatorList.loading ? (
                      <CategoryListingLoader />
                    ) : (
                      <>
                        {userCategory.contentCreatorList.data.content_creators
                          .length > 0 ? (
                          <>
                            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {userCategory.contentCreatorList.data.content_creators.map(
                                (creator, index) => (
                                  <UserCard key={index} creator={creator} />
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4>No creator Found</h4>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="w-full">
                    <h4 className="font-semibold text-lg  mb-4">
                      THE BEST CREATORS OF LAST WEEK
                    </h4>
                    {userCategory.contentCreatorList.loading ? (
                      <CategoryListingLoader />
                    ) : (
                      <>
                        {userCategory.contentCreatorList.data.content_creators
                          .length > 0 ? (
                          <>
                            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {userCategory.contentCreatorList.data.content_creators.map(
                                (creator, index) => (
                                  <UserCard key={index} creator={creator} />
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4>No creator Found</h4>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="w-full">
                    <h4 className="font-semibold text-lg  mb-4">
                      THE BEST CREATORS OF LAST WEEK
                    </h4>
                    {userCategory.contentCreatorList.loading ? (
                      <CategoryListingLoader />
                    ) : (
                      <>
                        {userCategory.contentCreatorList.data.content_creators
                          .length > 0 ? (
                          <>
                            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {userCategory.contentCreatorList.data.content_creators.map(
                                (creator, index) => (
                                  <UserCard key={index} creator={creator} />
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4>No creator Found</h4>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="w-full">
                    <h4 className="font-semibold text-lg  mb-4">
                      THE BEST CREATORS OF LAST WEEK
                    </h4>
                    {userCategory.contentCreatorList.loading ? (
                      <CategoryListingLoader />
                    ) : (
                      <>
                        {userCategory.contentCreatorList.data.content_creators
                          .length > 0 ? (
                          <>
                            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {userCategory.contentCreatorList.data.content_creators.map(
                                (creator, index) => (
                                  <UserCard key={index} creator={creator} />
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4>No creator Found</h4>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </>
          ) : (
            <div>
              <h4>No list Found</h4>
            </div>
          )}
        </Tab.Group>
      )}

      <div className="w-full row-container space-x-1 py-5">
        <div className="!bg-white border !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
          <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
        </div>
        <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
          Load more Users
        </p>
      </div>
    </>
  );
};

export default CategoryListingIndex;
