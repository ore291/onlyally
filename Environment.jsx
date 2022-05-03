import axios from "axios";
import { apiConstants } from "./components/Constant/constants";
import { getSession } from "next-auth/react";
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

const apiUrl = "https://cms.onlyally.com/api/user/"; // Production Mode

// const apiUrl = "http://localhost:8000/api/user/"; // Local Mode

const Environment = {
  postMethod: async ({
    action,
    accessToken = null,
    userId = null,
    object,
    dev_model = null,
  } = {}) => {
    // postMethod: async (action, accessToken, userId, object) => {
    let user_id = null;
    let token = null;
    if (typeof window !== "undefined") {
      user_id =
        localStorage.getItem("userId") !== "" &&
        localStorage.getItem("userId") !== null &&
        localStorage.getItem("userId") !== undefined
          ? localStorage.getItem("userId")
          : "";

      token =
        localStorage.getItem("accessToken") !== "" &&
        localStorage.getItem("accessToken") !== null &&
        localStorage.getItem("accessToken") !== undefined
          ? localStorage.getItem("accessToken")
          : "";
    }

    const url = apiUrl + action;

    // if(typeof(window) == "undefined"){
    //   const formData = new FormData();
    // } else{
    //   const formData = new window.FormData()
    // }

    const formData = new FormData();

    // By Default Id and token
    if (
      user_id != null &&
      token != null &&
      user_id != "undefined" &&
      token != "undefined"
    ) {
      formData.append("id", user_id);
      formData.append("token", token);
    } else {
      formData.append("id", userId);
      formData.append("token", accessToken);
    }

    var socialLoginUser = 0;

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);

      if (key === "social_unique_id") {
        socialLoginUser = 1;
      }
    }

    // By Default added device type and login type in future use
    if (!socialLoginUser) {
      formData.append("login_by", apiConstants.LOGIN_BY);
    }

    formData.append("device_type", apiConstants.DEVICE_TYPE);
    formData.append("device_token", apiConstants.DEVICE_TOKEN);

    if (dev_model != "undefined" && dev_model != null && dev_model != "") {
      formData.append("device_model", dev_model);
    } else {
      var device_model = "";
      if (isAndroid == true) {
        device_model = mobileModel;
      } else if (isIOS == true) {
        device_model = mobileModel;
      } else {
        device_model = browserName + " " + browserVersion;
        // device_model = "Chrome" + " " + "100";
      }
      console.log(device_model);
      formData.append("device_model", device_model);
    }

    if (typeof window != "undefined") {
      var config = {
        method: "POST",
        url: url,
        data: formData,
      };
    } else {
      var config = {
        method: "POST",
        url: url,
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      };
    }

    // var config = {
    //   method: "POST",
    //   url: url,
    //   headers: {
    //         ...formData.getHeaders(),
    //       },
    //   data: formData };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      return error;
      console.log(error);
    }

    // Progress bar
    // {
    //   onUploadProgress: (ProgressEvent) => {
    //     console.log({
    //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
    //     });
    //   },
    // }
  },

  getMethod: async (action, object) => {
    let userId =
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== undefined
        ? localStorage.getItem("userId")
        : "";
    let accessToken =
      localStorage.getItem("accessToken") !== "" &&
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
        ? localStorage.getItem("accessToken")
        : "";

    const url = apiUrl + action;

    let formData = new FormData();

    // By Default Id and token

    formData.append("id", userId);
    formData.append("token", accessToken);

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

    for (var p of formData) {
      console.log(p);
    }

    return await axios.get(url, formData);
  },

  /*methods(action) {

        const url = apiUrl+'/api/'+action;

        return {
            getOne: ({ id }) => axios.get(`${url}/${id}`),
            getAll: (toGet) => axios.post(url, toGet),
            update: (toUpdate) =>  axios.put(url,toUpdate),
            create: (toCreate) =>  axios.put(url,toCreate),
            delete: ({ id }) =>  axios.delete(`${url}/${id}`)
        }
    }*/
};

export default Environment;
