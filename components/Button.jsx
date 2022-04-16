const Button = ({ text, active, extraClasses, textClass }) => {
  return (
    <button
      className={`${
        extraClasses ? extraClasses : "w-20 h-7"
      } ${
        active
          ? "bg-[#FF1534] hover:bg-textPlayRed text-white"
          : "bg-[#e7e5e5]"
      } rounded cursor-pointer flex items-center justify-center group `}
    >
      <p className={`${textClass ? textClass : "text-[12px] font-medium"} `}>
        {text}
      </p>
    </button>
  );
};

export default Button;
