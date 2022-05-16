import React from "react"
import ContentLoader from "react-content-loader"

const ExploreLoader = (props) => (
  <ContentLoader 
  uniqueKey="explore-loader"
    speed={2}
    width={900}
    height={700}
    viewBox="0 0 900 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="7" y="22" rx="0" ry="0" width="350" height="237" /> 
    <rect x="380" y="21" rx="0" ry="0" width="350" height="237" /> 
    <rect x="750" y="22" rx="0" ry="0" width="350" height="237" /> 
    <circle cx="34" cy="301" r="24" /> 
    <rect x="75" y="287" rx="0" ry="0" width="100" height="6" /> 
    <rect x="75" y="299" rx="0" ry="0" width="50" height="7" /> 
    <rect x="280" y="287" rx="0" ry="0" width="30" height="30" /> 
    <rect x="345" y="287" rx="0" ry="0" width="8" height="30" /> 
    <circle cx="410" cy="300" r="24" /> 
    <rect x="455" y="286" rx="0" ry="0" width="100" height="6" /> 
    <rect x="455" y="298" rx="0" ry="0" width="50" height="7" /> 
    <rect x="670" y="286" rx="0" ry="0" width="30" height="30" /> 
    <rect x="720" y="286" rx="0" ry="0" width="8" height="30" /> 
    <circle cx="780" cy="300" r="24" /> 
    <rect x="825" y="286" rx="0" ry="0" width="100" height="6" /> 
    <rect x="825" y="298" rx="0" ry="0" width="50" height="7" /> 
    <rect x="1040" y="286" rx="0" ry="0" width="30" height="30" /> 
    <rect x="1090" y="286" rx="0" ry="0" width="8" height="30" /> 
    <rect x="7" y="347" rx="0" ry="0" width="350" height="237" /> 
    <rect x="380" y="346" rx="0" ry="0" width="350" height="237" /> 
    <rect x="750" y="347" rx="0" ry="0" width="350" height="237" /> 
    <circle cx="34" cy="626" r="24" /> 
    <rect x="75" y="612" rx="0" ry="0" width="100" height="6" /> 
    <rect x="75" y="624" rx="0" ry="0" width="50" height="7" /> 
    <rect x="280" y="612" rx="0" ry="0" width="30" height="30" /> 
    <rect x="345" y="612" rx="0" ry="0" width="8" height="30" /> 
    <circle cx="410" cy="625" r="24" /> 
    <rect x="455" y="611" rx="0" ry="0" width="100" height="6" /> 
    <rect x="455" y="623" rx="0" ry="0" width="50" height="7" /> 
    <rect x="670" y="611" rx="0" ry="0" width="30" height="30" /> 
    <rect x="720" y="611" rx="0" ry="0" width="8" height="30" /> 
    <circle cx="780" cy="625" r="24" /> 
    <rect x="825" y="611" rx="0" ry="0" width="100" height="6" /> 
    <rect x="825" y="623" rx="0" ry="0" width="50" height="7" /> 
    <rect x="1040" y="611" rx="0" ry="0" width="30" height="30" /> 
    <rect x="1090" y="611" rx="0" ry="0" width="8" height="30" />
  </ContentLoader>
)

export default ExploreLoader;