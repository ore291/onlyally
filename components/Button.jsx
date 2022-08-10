const Button = ({ text, active, extraclassNamees, textclassName, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${extraclassNamees ? extraclassNamees : "w-20 h-7"} ${
        active ? "bg-[#FF1534] hover:bg-textPlayRed text-white" : "bg-[#e7e5e5]"
      } rounded cursor-pointer flex items-center justify-center group `}
    >
      <p
        className={`${
          textclassName ? textclassName : "text-[12px] font-medium"
        } `}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
