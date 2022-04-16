import Image from "next/image";
const RightSideBar = () => {
  return (
    <aside className="hidden lg:block col-span-1 border-solid border-black-50  h-screen border-l-[1px] pt-16 sticky top-0">
      <div className="p-2 flex flex-col justify-center items-center space-y-4">
        {[
          ...Array(5)].map((_, i) => (
            <div className=" w-14 h-14 relative" key={i}>
              <Image
                src="/profile_avatar_full.jpg"
                alt="side-img"
                layout="fill"
                objectFit="cover"
                className="relative rounded-full"
              />
            </div>
          ))}
      </div>
    </aside>
  );
};

export default RightSideBar;
