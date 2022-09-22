import Header from "./Header";
import HeaderOffline from "./layout/HeaderOffline";
import { checkCookies, hasCookie } from "cookies-next";
import { useRouter } from "next/router";

function Layout(props) {
  const checkSession = hasCookie("accessToken");
  const router = useRouter();

 

  return (
    <>
      {router.pathname != "/onboarding" && (
        <>{checkSession ? <Header /> : <HeaderOffline />}</>
      )}
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
