import "../styles/globals.css";


import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store";
import { apiConstants } from "../components/Constant/constants";
import configuration from "react-global-configuration";
import {useEffect} from "react";
// require('default-passive-events');

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // useEffect(() => {
  //   fetchConfig();
    
  //   // let userLanguage = localStorage.getItem("lang")
  //   //   ? localStorage.getItem("lang")
  //   //   : "en";
  // }, []);

  // const fetchConfig = async () => {
  //   try {
  //     const response = await fetch(apiConstants.settingsUrl);
  //     const configValue = await response.json();

  //     configuration.set({ configData: configValue.data }, { freeze: false });
  //     console.log(configValue.data);
  //     // this.setState({ configLoading: false });
  //   } catch (error) {
  //     configuration.set({ configData: [] }, { freeze: false });
  //     // this.setState({ configLoading: false });
  //   }
  // }
  




  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
