import Header from "./Header";
import HeaderOffline from "./layout/HeaderOffline";
import { checkCookies, hasCookie } from "cookies-next";
import { useRouter } from "next/router";

function Layout(props) {
  const checkSession = hasCookie("accessToken");
  const router = useRouter();

  

 

  return (
    <>
    {/* <Header /> */}
      {router.pathname != "/onboarding" && router.pathname != "/register/verify" && (
        <>{checkSession ? <Header /> : <HeaderOffline />}</>
      )}
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
