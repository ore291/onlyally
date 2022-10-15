import React, { useState, useCallback } from "react";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialTwitter,
} from "reactjs-social-login";


const REDIRECT_URI = window.location.href;

const FacebookButton = (props) => {
  // social parts

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  return (
    <LoginSocialFacebook
      appId={"228628742708121" || ""}
      onLoginStart={onLoginStart}
      onResolve={({ provider, data }) => {
        setProvider(provider);
        setProfile(data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      {props.children}
    </LoginSocialFacebook>
  );
};

export default FacebookButton;
