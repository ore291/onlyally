import SideNavLayout from "../components/SideNavLayout";
import FilterSearch from "../components/explore/FilterSearch";
import Tabs from "../components/explore/Tabs";


import { fetchExploreStart } from "../store/slices/postSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Explore = () => {
  const dispatch = useDispatch();
  const explorePosts = useSelector((state) => state.post.explorePosts);

  useEffect(() => {
    dispatch(fetchExploreStart());
   
  }, []);

  return (
    <SideNavLayout>
      <div className="max-w-5xl px-1 mx-auto">
        <FilterSearch />

        <Tabs />
      </div>
    </SideNavLayout>
  );
};

export default Explore;
