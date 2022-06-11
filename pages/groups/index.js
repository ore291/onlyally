import SideNavLayout from "../../components/SideNavLayout";
import GroupTabs from "../../components/groups/GroupTabs";
import GroupCard from "../../components/groups/GroupCard";
import GroupTabsMain from  "../../components/groups/GroupTabsMain.jsx"
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react"
import {fetchGroupsStart, fetchGroupsCategoriesStart} from "../../store/slices/groupsSlice";

const Groups = () => {

  const dispatch = useDispatch();

  const images = [
    "person2",
    "person5",
    "person6",
    "person7",
    "person8",
    "person2",
    "person3",
    "person8",
  ];

useEffect(() => {
  dispatch(fetchGroupsStart());
  dispatch(fetchGroupsCategoriesStart())
}, [])

  const groups = useSelector(state => state.groups.groups)

 

  return (
    <SideNavLayout>
      <div className="max-w-5xl mx-auto xl:max-w-7xl p-5">
        {
          groups.loading ?  null : (<GroupTabsMain groupsData={groups}/>) 
        }
        
        <div className="bg-white rounded-2xl my-10 p-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b mb-5">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-2xl font-semibold">Categories</h1>
              <p className="text-sm font-semibold text-gray-500">
                Find a group by browsing top categories.
              </p>
            </div>
            <div className="row-container cursor-pointer">
              <p className="font-semibold text-blue-400 ">See all</p>
            </div>
          </div>
          <div className="p-2 pb-5 flex overflow-x-scroll space-x-3 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
            {images.map((image, i) => (
              <div className="flex-shrink-0 relative group rounded-md" key={i}>
                <Image
                  className="rounded-lg group-hover:cursor-pointer inset-0 "
                  src={`/images/${image}.jpg`}
                  alt={image}
                  height={150}
                  width={170}
                />
                <p className="font-bold text-white text-lg absolute left-3 bottom-4">
                  Travel
                </p>
                {/* <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 ease-in-out group-hover:bg-opacity-10 group-hover:cursor-pointer rounded-md "/> */}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5">
            <div className="col-span-2">
              <GroupTabs groupsAll={true} />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <h1 className="text-2xl font-semibold">
                Suggested For You
              </h1>
              {[...Array(2)].map((_, index) => (
                <GroupCard filter={true} key={index} />
              ))}{" "}
            </div>
          </div>
          <div className="flex items-center justify-between pb-2 border-b my-5 ">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-2xl font-semibold">Suggestions</h1>
              <p className="text-sm font-semibold text-gray-500">
                Find a group You Might be interested in.
              </p>
            </div>
            <div className="row-container cursor-pointer">
              <p className="font-semibold text-blue-400 ">See all</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 pb-5">
            {[...Array(10)].map((_, index) => (
              <GroupCard key={index} groupsSuggestion={true} />
            ))}
          </div>
        </div>
      </div>
    </SideNavLayout>
  );
};

export default Groups;
