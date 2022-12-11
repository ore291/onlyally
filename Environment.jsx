import axios from "axios";
import { apiConstants } from "./components/Constant/constants";
import {
  useDeviceSelectors,
  getSelectorsByUserAgent,
} from "react-device-detect";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion,
} from "react-device-detect";

var FormData = require("form-data");

const apiUrl = "https://api.playjor.com/api/user/"; // Production Mode

// const apiUrl = "http://localhost:8000/api/user/"; // Local Mode

const Environment = {
  postMethod: async ({
    action,
    accessToken = null,
    userId = null,
    object,
    dev_model = null,
  } = {}) => {
    let user_id = null;
    let token = null;

    const cookies = getCookies();

    if (typeof window !== "undefined") {
      user_id = cookies.userId;
      token = cookies.accessToken;
    }

    // if (typeof window !== "undefined") {
    //   user_id =
    //     localStorage.getItem("userId") !== "" &&
    //     localStorage.getItem("userId") !== null &&
    //     localStorage.getItem("userId") !== undefined
    //       ? localStorage.getItem("userId")
    //       : null;

    //   token =
    //     localStorage.getItem("accessToken") !== "" &&
    //     localStorage.getItem("accessToken") !== null &&
    //     localStorage.getItem("accessToken") !== undefined
    //       ? localStorage.getItem("accessToken")
    //       : null;

    // }

    const url = apiUrl + action;

    // if(typeof(window) == "undefined"){
    //   const formData = new FormData();
    // } else{
    //   const formData = new window.FormData()
    // }

    const formData = new FormData();

    // By Default Id and token
    // if (
    //   user_id != null &&
    //   token != null &&
    //   user_id != "undefined" &&
    //   token != "undefined" &&
    //   user_id != "" &&
    //   token != ""
    // ) {
    //   formData.append("id", user_id);
    //   formData.append("token", token);
    // } else {
    //   formData.append("id", userId);
    //   formData.append("token", accessToken);
    // }

    var socialLoginUser = 0;

    // append your data
    for (var key in object) {
     
      if (key === "social_unique_id") {
        socialLoginUser = 1;
      }

      if(key === "files"){
        for(let file in object['files']){
          formData.append(`post_files[${file}]`, object['files'][file]);
        }
      }else if(key === "post_files"){
        for(let file in object['post_files']){
          formData.append(`post_files[${file}]`, object['post_files'][file]);
        }
      } else{
        formData.append(key, object[key]);
      }
    }

    // By Default added device type and login type in future use
    if (!socialLoginUser) {
      formData.append("login_by", apiConstants.LOGIN_BY);
    }

    if (typeof window != "undefined") {
      var config = {
        method: "POST",
        url: url,
        data: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else {
      var config = {
        method: "POST",
        url: url,
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          // "content-type": "application/json",
          // accept: "application/json",
        },
        data: formData,
      };
    }

    try {
      const response = await axios(config);

      return response;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return error.response;
      } else if (error.message) {
        return error.message;
      } else {
        return error;
      }
    }
  },

  // used for playjor new routes
  getMethod: async ({ action, object, accessToken = null } = {}) => {
    const cookies = getCookies();

    const url =
      // "https://playjor-cors.herokuapp.com/" +
      apiUrl + action;

    const formData = new FormData();

    // By Default Id and token
    // formData.append("id", cookies.userId);

    // if (typeof window !== "undefined") {
    //   formData.append("token", cookies.accessToken);
    // } else {
    //   formData.append("token", accessToken);
    // }
    // append your data
    for (var key in object) {
      formData.append(key, object[key]);
    }

    // By Default added device type and login type in future use

    // formData.append("login_by", apiConstants.LOGIN_BY);
    // formData.append("device_type", apiConstants.DEVICE_TYPE);
    // formData.append("device_token", apiConstants.DEVICE_TOKEN);

    // var device_model = "";
    // if (isAndroid == true) {
    //   device_model = mobileModel;
    // } else if (isIOS == true) {
    //   device_model = mobileModel;
    // } else {
    //   device_model = browserName + " " + browserVersion;
    // }

    // formData.append("device_model", device_model);

    // var data = JSON.stringify({
    //   id: 4,
    //   token: "2y10Y8IQpKSTSvwXbsw7DsfEOpyb0RJ2ejWKdSFcvsF3P7IO0ADDZ5i",
    //   device_model: "Chrome 101",
    // });

    var config = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        Authorization: `Bearer ${
          accessToken ? accessToken : cookies.accessToken
        }`,
      },
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },

  playPostMethod: async ({ action, object } = {}) => {
    const cookies = getCookies();

    const url = apiUrl + action;

    const formData = new FormData();

    // By Default Id and token
    formData.append("id", cookies.userId);
    formData.append("token", cookies.accessToken);

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);
    }

    // By Default added device type and login type in future use

    formData.append("login_by", apiConstants.LOGIN_BY);
    formData.append("device_type", apiConstants.DEVICE_TYPE);
    formData.append("device_token", apiConstants.DEVICE_TOKEN);

    var device_model = "";
    if (isAndroid == true) {
      device_model = mobileModel;
    } else if (isIOS == true) {
      device_model = mobileModel;
    } else {
      device_model = browserName + " " + browserVersion;
    }

    formData.append("device_model", device_model);

    // var data = JSON.stringify({
    //   id: 4,
    //   token: "2y10Y8IQpKSTSvwXbsw7DsfEOpyb0RJ2ejWKdSFcvsF3P7IO0ADDZ5i",
    //   device_model: "Chrome 101",
    // });

    var config = {
      method: "POST",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
      data: formData,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },

  putMethod: async ({ action, object } = {}) => {
    const cookies = getCookies();

    const url = apiUrl + action;

    const formData = new FormData();

    // By Default Id and token
    formData.append("id", cookies.userId);
    formData.append("token", cookies.accessToken);

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);
    }

    // By Default added device type and login type in future use

    // formData.append("login_by", apiConstants.LOGIN_BY);
    // formData.append("device_type", apiConstants.DEVICE_TYPE);
    // formData.append("device_token", apiConstants.DEVICE_TOKEN);

    // var device_model = "";
    // if (isAndroid == true) {
    //   device_model = mobileModel;
    // } else if (isIOS == true) {
    //   device_model = mobileModel;
    // } else {
    //   device_model = browserName + " " + browserVersion;
    // }

    // formData.append("device_model", device_model);

    var data = JSON.stringify({
      ...object,
      id: cookies.userId,
      token: cookies.accessToken,
      // device_model: device_model,
    });

    var config = {
      method: "PUT",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);

      return error.toJSON();
    }
  },

  deleteMethod: async ({ action, object } = {}) => {
    const cookies = getCookies();

    const url = apiUrl + action;

    const formData = new FormData();

    // By Default Id and token
    formData.append("id", cookies.userId);
    formData.append("token", cookies.accessToken);

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);
    }

    // By Default added device type and login type in future use

    var data = JSON.stringify({
      id: cookies.userId,
      token: cookies.accessToken,
      ...object,
    });

    var config = {
      method: "DELETE",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default Environment;
