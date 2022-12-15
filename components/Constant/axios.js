import axios from "axios";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";



const cookies = getCookies();

let user_id = null;
let token = null;

if (typeof window !== "undefined") {
  user_id = cookies.userId;
  token = cookies.accessToken;
}

const instance = axios.create({
  baseURL: 'https://api.playjor.com',
  headers: {
    'Accept': 'application/json',
    'Authorization' : 'Bearer ' + token
}
});

// instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;



export default instance;

