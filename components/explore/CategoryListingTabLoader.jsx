import React from "react"
import ContentLoader from "react-content-loader"

const CategoryListingTabLoader = (props) => (
  <ContentLoader 
    speed={2}
    // width={1100}
    // height={100}
    viewBox="0 0 1100 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="7" y="16" rx="5" ry="5" width="127" height="39" /> 
    <rect x="146" y="16" rx="5" ry="5" width="127" height="39" /> 
    <rect x="285" y="15" rx="5" ry="5" width="127" height="39" /> 
    <rect x="424" y="14" rx="5" ry="5" width="127" height="39" />
    <rect x="565" y="14" rx="5" ry="5" width="127" height="39" />
    <rect x="705" y="14" rx="5" ry="5" width="127" height="39" />
    <rect x="845" y="14" rx="5" ry="5" width="127" height="39" />
    <rect x="985" y="14" rx="5" ry="5" width="127" height="39" />
  </ContentLoader>
)

export default CategoryListingTabLoader;