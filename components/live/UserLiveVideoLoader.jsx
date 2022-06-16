import React from "react"
import ContentLoader from "react-content-loader"

const UserLiveVideoLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={550}
    viewBox="0 0 1200 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="4" y="19" rx="0" ry="0" width="350" height="240" /> 
    <rect x="380" y="15" rx="0" ry="0" width="350" height="240" /> 
    <rect x="750" y="16" rx="0" ry="0" width="350" height="240" /> 
    <rect x="4" y="277" rx="0" ry="0" width="350" height="240" /> 
    <rect x="380" y="273" rx="0" ry="0" width="350" height="240" /> 
    <rect x="750" y="274" rx="0" ry="0" width="350" height="240" />
  </ContentLoader>
)

export default UserLiveVideoLoader;