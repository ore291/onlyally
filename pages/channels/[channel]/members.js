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
import {
  getSelectorsByUserAgent,
  isMobileOnly,
  isMobile,
} from "react-device-detect";
import { useSelector, useDispatch } from "react-redux";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import MembersGridLayout from "../../../components/helpers/MembersGridLayout";
import { getCookies } from "cookies-next";

import { END } from "redux-saga";
import { wrapper } from "../../../store";

const Members = () => {
  const { data: group, loading } = useSelector(
    (state) => state.groups.groupData
  );

  return (
    <SideNavLayout>
      {loading ? (
        <ProfileLoader />
      ) : group.members && group.members.length > 0 ? (
        <div>
          <GroupPageHeader group={group} />

          <MembersGridLayout />
        </div>
      ) : (
        <NoDataFound />
      )}
    </SideNavLayout>
  );
};

export default Members;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const { group } = params;

      const userAgent = req.headers["user-agent"];
      const {
        isAndroid,
        isIOS,
        isWindows,
        isMacOs,
        mobileModel,
        browserName,
        osName,
        mobileVendor,
        browserVersion,
      } = getSelectorsByUserAgent(userAgent);

      var device_model = "";
      if (isAndroid == true) {
        device_model = mobileModel;
      } else if (isIOS == true) {
        device_model = mobileModel;
      } else {
        device_model = browserName + " " + browserVersion;
        // device_model = "Chrome" + " " + "100";
      }

      const cookies = getCookies({ req, res });

      store.dispatch(
        fetchSingleGroupStart({
          accessToken: cookies.accessToken,
          group_slug: group,
        })
      );

      store.dispatch(
        fetchSingleGroupMemberStart({
          accessToken: cookies.accessToken,
          group_slug: group,
        })
      );

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
      };
    }
);
