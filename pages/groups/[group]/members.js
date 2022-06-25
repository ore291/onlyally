import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SideNavLayout from "../../../components/SideNavLayout";
import ProfileLoader from "../../../components/Profile/ProfileLoader";
import GroupPageHeader from "../../../components/groups/GroupPageHeader";
import {
  fetchSingleGroupStart,
  fetchSingleGroupMemberStart,
  joinGroupStart,
} from "../../../store/slices/groupsSlice";
import { useSelector, useDispatch } from "react-redux";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import MembersGridLayout from "../../../components/helpers/MembersGridLayout";

const Members = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: group, loading } = useSelector(
    (state) => state.groups.groupData
  );
  

  useEffect(() => {
    if (!router.isReady) return;

    // Code using query
    dispatch(fetchSingleGroupStart(router.query.group));
    dispatch(fetchSingleGroupMemberStart(router.query.group));
  }, [router.isReady]);

  return (
    <SideNavLayout>
      {loading ? (
        <ProfileLoader />
      ) : group.members && group.members.length > 0 ? (
        <div>
          <GroupPageHeader group={group} />
          {
              
                  <MembersGridLayout  />
             
          }
        </div>
      ) : (
        <NoDataFound />
      )}
    </SideNavLayout>
  );
};

export default Members;
