import ContentLoader from "react-content-loader"

const StorySliderLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={200}
    viewBox="0 0 1200 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="20" y="130" rx="0" ry="0" width="0" height="9" /> 
    <circle cx="50" cy="90" r="45" /> 
    <rect x="0" y="145" rx="0" ry="0" width="95" height="15" /> 
    <rect x="60" y="109" rx="0" ry="0" width="28" height="22" /> 
    <circle cx="165" cy="90" r="45" /> 
    <rect x="120" y="145" rx="0" ry="0" width="95" height="15" /> 
    <circle cx="280" cy="90" r="45" /> 
    <rect x="235" y="145" rx="0" ry="0" width="95" height="15" /> 
    <circle cx="395" cy="90" r="45" /> 
    <rect x="350" y="145" rx="0" ry="0" width="95" height="15" /> 
    <circle cx="505" cy="90" r="45" /> 
    <rect x="460" y="145" rx="0" ry="0" width="95" height="15" />
    <circle cx="618" cy="90" r="45" /> 
    <rect x="570" y="145" rx="0" ry="0" width="95" height="15" />
    <circle cx="730" cy="90" r="45" /> 
    <rect x="680" y="145" rx="0" ry="0" width="95" height="15" />
    <circle cx="840" cy="90" r="45" /> 
    <rect x="795" y="145" rx="0" ry="0" width="95" height="15" />
    <circle cx="953" cy="90" r="45" /> 
    <rect x="905" y="145" rx="0" ry="0" width="95" height="15" />
    <circle cx="1060" cy="90" r="45" /> 
    <rect x="1015" y="145" rx="0" ry="0" width="95" height="15" />
  </ContentLoader>
)

export default StorySliderLoader;