import React from "react"
import ContentLoader from "react-content-loader"

const CategoryListingLoader = (props) => (
  <ContentLoader 
    speed={2}
    // width={1100}
    // height={650}
    viewBox="0 0 1100 650"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="7" y="25" rx="5" ry="5" width="350" height="296" /> 
    <rect x="380" y="25" rx="5" ry="5" width="350" height="296" /> 
    <rect x="750" y="25" rx="5" ry="5" width="350" height="296" /> 
    <rect x="7" y="350" rx="5" ry="5" width="350" height="296" /> 
    <rect x="380" y="350" rx="5" ry="5" width="350" height="296" /> 
    <rect x="750" y="350" rx="5" ry="5" width="350" height="296" />
  </ContentLoader>
)

export default CategoryListingLoader;
