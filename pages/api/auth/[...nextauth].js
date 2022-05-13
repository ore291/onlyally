import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
var axios = require("axios");
var FormData = require("form-data");
import { useDeviceSelectors , getSelectorsByUserAgent} from 'react-device-detect';
var localStorage = require("localStorage");
// const DeviceDetector = require('node-device-detector');
// const DeviceHelper = require('node-device-detector/helper');
'use strict';


var rootCas = require('ssl-root-cas').create();
 
// rootCas
//   .addFile('pages/api/auth/ssl/ss_bundle.pem')
//   .addFile('pages/api/auth/ssl/ss_cert.pem')
//   ;
 
// will work with all https requests will all libraries (i.e. request.js)
require('https').globalAgent.options.ca = rootCas;



export default NextAuth({
  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24 * 60 * 60
  //   },
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // const detector = new DeviceDetector({clientVersionTruncate: 0,});

        const userAgent = req.headers['user-agent']; 
        const {  isAndroid,
          isIOS,
          isWindows,
          isMacOs,
          mobileModel,
          browserName,
          osName,
          mobileVendor,
          browserVersion, } = getSelectorsByUserAgent(userAgent)

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
        // const result = detector.detect(userAgent);
        // var device_model = "";
        // if (DeviceHelper.isMobile(result)) {
        //   console.log(result)
        //   device_model = result.device.model;
        // } else {
        //   device_model = result.client.name + " " + result.client.version;
        //   // device_model = "Chrome" + " " + "100";
        // }

        const data = new FormData();
        data.append("email", credentials.email);
        data.append("password", credentials.password);
        data.append("login_by", "manual");
        data.append("device_token", "123456");
        data.append("device_type", "web");
        data.append("device_model", device_model);
        // data.append("device_model", credentials.device_model);
        
        var config = {
          method: "post",
          url: "https://cp.playjor.com/api/user/login",
          headers: {
            ...data.getHeaders(),
          },
          data: data,
      
        };

        try {
          const res = await axios(config);
          console.log(res)
        
          const user = await res.data.data;

          // If no error and we have user data, return it

          if (res.data.success && user) {
            return user;
          }
        } catch (e) {
          const errorMessage = e;
          console.log(errorMessage);
          // throw new Error(errorMessage + "&email" + credentials.email);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userId = user.user_id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userId = token.userId;
      session.user.userDetails = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
 
});
