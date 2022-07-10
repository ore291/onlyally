import Header from "./Header";
import HeaderOffline from "./layout/HeaderOffline";
import { checkCookies,hasCookie } from "cookies-next";


function Layout(props) {
  const checkSession = hasCookie('accessToken');

  
 
   return (
    <>
      {checkSession ? (<Header />) : (<HeaderOffline />)}
      <main>{props.children}</main>
    </>
  );
}



export default Layout;
