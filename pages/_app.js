import "../styles/globals.css";
// import "../styles/css/custom.css";
// import "../styles/css/dark-mode.css";
// import "../styles/css/glightbox.min.css";
// import "../styles/css/responsive.css";

// import "../styles/css/zuck-style.css";
// import "../styles/css/zuck.css";
// import "../styles/css/zuck.min.css";
// import "../styles/css/intlTelInput.min.css"
// import "../styles/css/style.css";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store";
import { apiConstants } from "../components/Constant/constants";
import configuration from "react-global-configuration";
import {useEffect} from "react";

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
