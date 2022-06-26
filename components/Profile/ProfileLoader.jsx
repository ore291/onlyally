import React from "react";
import ContentLoader from "react-content-loader";
import {isMobileOnly} from "react-device-detect";

const ProfileLoader = (props) => {

 return (
  <ContentLoader 
  speed={2}
  width={isMobileOnly ? 400 : 800}
  height={600}
  // viewBox="0 0 1000 600"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"

  {...props}
>
  <rect x="9" y="14" rx="0" ry="0" width={isMobileOnly ? "120" : "220" } height="146" /> 
  <rect x="152" y="13" rx="0" ry="0"  width={isMobileOnly ? "132" : "232" } height="146" /> 
  <rect x="303" y="13" rx="0" ry="0"  width={isMobileOnly ? "132" : "232" } height="146" /> 
  <rect x="10" y="189" rx="0" ry="0" width={isMobileOnly ? "433" : "750" } height="600" />
</ContentLoader>
)};

export default ProfileLoader;
