

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
import { setUpNotifications } from "reapop";
import axios from "axios";

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


  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NextNProgress color="#FF1636" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Notifications />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
