import React from "react"
import ContentLoader from "react-content-loader"

const UserLiveVideoLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={900}
    height={300}

    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9"  className="dark:bg-gray-900 dark:text-gray-300"/> 
    <rect x="4" y="19" rx="0" ry="0" width="250" height="240"  className="dark:bg-gray-900 dark:text-gray-300"/> 
    <rect x="380" y="15" rx="0" ry="0" width="250" height="240" className="dark:bg-gray-900 dark:text-gray-300"/> 
    <rect x="750" y="16" rx="0" ry="0" width="250" height="240" className="dark:bg-gray-900 dark:text-gray-300"/> 
    <rect x="4" y="277" rx="0" ry="0" width="250" height="240" className="dark:bg-gray-900 dark:text-gray-300"/> 
    <rect x="380" y="273" rx="0" ry="0" width="250" height="240" className="dark:bg-gray-900 dark:text-gray-300"/> 
    <rect x="750" y="274" rx="0" ry="0" width="250" height="240" className="dark:bg-gray-900 dark:text-gray-300"/>
  </ContentLoader>
)

export default UserLiveVideoLoader;