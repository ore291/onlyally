import React, { useState, useCallback } from "react";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialTwitter,
} from "reactjs-social-login";


const REDIRECT_URI = window.location.href;

const GoogleButton = (props) => {
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
    <LoginSocialGoogle
    client_id={"531097618906-aka3ev9pbnc8hho307dfrfllsvafcrhe.apps.googleusercontent.com" || ""}
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
    </LoginSocialGoogle>
  );
};

export default GoogleButton;
