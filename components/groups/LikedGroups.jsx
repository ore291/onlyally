import { useEffect } from "react";
import Button from "../Button";
import SideBarLoader from "../helpers/SideBarLoader";

import Image from "next/image";
import GroupCard from "./GroupCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsStart } from "../../store/slices/groupsSlice";

const LikedGroups = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);

  useEffect(() => {

    dispatch(fetchGroupsStart());
  }, []);

  return (
    <div className="side-container">
      <div className="flex items-center justify-between px-2">
        <p className="text-start font-bold">Groups you may like</p>
        <span
          onClick={() => dispatch(fetchGroupsStart())}
          className="text-blue-500 text-xs cursor-pointer"
        >
          Refresh
        </span>
      </div>

      {groups.loading ? (
        <SideBarLoader />
      ) : (
        <div className="flex flex-col items-center space-y-2 px-2 pb-4">
          {groups.data.length > 0
            ? [...groups.data]
                .sort(() => Math.random() - Math.random())
                .slice(0, 4)
                .map((group, index) => <GroupCard key={index} group={group} />)
            : ""}
        </div>
      )}
    </div>
  );
};

export default LikedGroups;
