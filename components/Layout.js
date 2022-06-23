import Header from "./Header";
import HeaderOffline from "./layout/HeaderOffline";
import { checkCookies } from "cookies-next";

function Layout(props) {
  const checkSession = checkCookies('accessToken');

  
 
   return (
    <>
      {checkSession ? (<Header />) : (<HeaderOffline />)}
      <main>{props.children}</main>
    </>
  );
}



export default Layout;
