import Image from "next/image"
import configuration from "react-global-configuration";
import {FaCheckCircle} from "react-icons/fa";

const VerifiedBadge = (props) => {
  return (
    <span className="!contents pt-0  items-center">
      <FaCheckCircle className="w-3 h-3 text-playRed" />
      {/* <span className="verified-info">{configuration.get('configData.verified_badge_text')}</span> */}
    </span>
  );
};

export default VerifiedBadge;
