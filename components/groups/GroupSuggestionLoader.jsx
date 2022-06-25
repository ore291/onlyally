import React from "react"
import ContentLoader from "react-content-loader"

const GroupSuggestionLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={450}
    viewBox="0 0 300 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="21" y="35" rx="0" ry="0" width="234" height="414" />
  </ContentLoader>
)

export default GroupSuggestionLoader

