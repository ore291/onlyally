import React from "react"
import ContentLoader from "react-content-loader"

const GroupCardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={250}
    viewBox="0 0 1000 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-107" y="20" rx="0" ry="0" width="186" height="234" /> 
    <rect x="95" y="19" rx="0" ry="0" width="186" height="234" /> 
    <rect x="295" y="19" rx="0" ry="0" width="186" height="234" /> 
    <rect x="494" y="19" rx="0" ry="0" width="186" height="234" />
    <rect x="694" y="19" rx="0" ry="0" width="186" height="234" />
  </ContentLoader>
)

export default GroupCardLoader

