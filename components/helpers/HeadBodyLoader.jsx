import React from 'react'
import ContentLoader from 'react-content-loader'
import {isMobile} from "react-device-detect"

const HeadBodyLoader = ({ ...rest }) => (
  <ContentLoader height={isMobile ? "250" : "500"} width={isMobile ? "350" : "500"} viewBox={isMobile ? "" : "0 0 265 230"} {...rest}>
    <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
    <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
  </ContentLoader>
)


export default HeadBodyLoader