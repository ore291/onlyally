import "../styles/globals.css";
import "../styles/custom.scss";

import NextNProgress from "nextjs-progressbar";

import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store";
import Notifications from "../components/notifications/Notifications.jsx";
import { apiConstants } from "../components/Constant/constants";
import configuration from "react-global-configuration";
import { useEffect } from "react";
import {fetchUserDetailsStart} from "../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import { setUpNotifications } from "reapop";
import { fetchConfigurationStart } from "../store/slices/configurationSlice";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      allowHTML: true,
      showDismissButton: true,
      dismissAfter: 3000,
      status: "success",
    },
  });

  const user = useSelector((state) => state.user.profile.data)

  const dispatch = useDispatch();
  const fetchConfig = async () => {
    try {
      const response = await fetch(apiConstants.settingsUrl);
      const configValue = await response.json();

      configuration.set({ configData: configValue.data }, { freeze: false });
    } catch (error) {
      configuration.set({ configData: [] }, { freeze: false });
    }
  };

  useEffect(() => {
    fetchConfig();

    if(user === {}){
       dispatch(fetchUserDetailsStart());
    }
   
    dispatch(fetchConfigurationStart()); 
  }, []);

  return (
    <SessionProvider session={session}  refetchOnWindowFocus={true} refetchInterval={5 * 60}>
      <NextNProgress color="#FF1636" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Notifications />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
