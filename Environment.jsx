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


const apiUrl = "https://cms.onlyally.com/api/user/"; // Production Mode

// const apiUrl = "http://localhost:8000/api/user/"; // Local Mode

const Environment = {

  postMethod: async (action,accessToken, userId, object) => {
   
    
    // let userId =
    //   localStorage.getItem("userId") !== "" &&
    //   localStorage.getItem("userId") !== null &&
    //   localStorage.getItem("userId") !== undefined
    //     ? localStorage.getItem("userId")
    //     : "";

    // let accessToken =
    //   localStorage.getItem("accessToken") !== "" &&
    //   localStorage.getItem("accessToken") !== null &&
    //   localStorage.getItem("accessToken") !== undefined
    //     ? localStorage.getItem("accessToken")
    //     : "";

   

    const url = apiUrl + action;

    let formData = new FormData();

    // By Default Id and token

    formData.append("id", userId);
    formData.append("token", accessToken);

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
   

    var device_model = "";
    if (isAndroid == true) {
      device_model = mobileModel;
    } else if (isIOS == true) {
      device_model = mobileModel;
    } else {
      device_model = browserName + " " + browserVersion;
    }
    
    
    formData.append("device_model", device_model);

    var config = {
      method: "post",
      url: url,
      // headers: {
      //   ...formData.getHeaders(),
      // },
      data: formData,
    };
    
    const response = await axios(config);
    return response;
   

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
