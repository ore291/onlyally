import axios from "axios";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";

const instance = axios.create({
    baseURL: 'https://api.playjor.com'
  });

const cookies = getCookies();

let user_id = null;
let token = null;

if (typeof window !== "undefined") {
  user_id = cookies.userId;
  token = cookies.accessToken;
}



instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;



export default instance;

