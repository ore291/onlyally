import { MdHome } from "react-icons/md";

const MobileNavCard = ({ children, text }) => {
  return (
    <div className="border rounded-md px-5 py-3 flex flex-col space-y-1 justify-center items-start">
      <div className="mobile-nav-icon">{children}</div>
      <h1 className="text-sm xs:text-lg font-bold whitespace-nowrap">{text}</h1>
    </div>
  );
};

export default MobileNavCard;
