import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import VerifiedBadge from "../../components/handlers/VerifiedBadge";

const NotificationCard = ({ notification }) => {

  const url = (urlLink)=>{
    if( urlLink === "fans"){
      return `bookmarks/${urlLink}`;
    }else if( urlLink === "payments"){
      return `payment/my-payment`;
    }else{
      return urlLink;
    }
  }
  return (
    <Link
      href={url(notification.action_url)}
      passHref
    >
      <div className="flex items-center   border-y first:border-y-0 last:border-y-0 py-3 w-full cursor-pointer">
        <div className="basis-1/12 ">
          <div className=" w-14 h-14 relative mr-3 md:mr-0">
            <Image
              src={notification.from_userpicture}
              alt="side-img"
              layout="fill"
              objectFit="cover"
              className=" rounded-full "
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-start basis-11/12">
          <div className="row-container space-x-1">
            <p className="text-lg font-semibold row-container">
              {notification.from_displayname}
              {notification.from_user.is_verified_badge == 1 ? (
                <span className="pl-2">
                  <VerifiedBadge />
                </span>
              ) : null}
            </p>
            <Link
              target="_blank"
              passHref
              href={`/${notification.from_username}`}
            >
              <span className="text-sm font-medium text-[#1DA1F2]">
                @{notification.from_username}
              </span>
            </Link>
          </div>
          <p className="text-sm md:text-lg font-normal text-ellipsis">
            {notification.message}
          </p>
          <span className="text-gray-400 font-medium text-xs">
            {notification.updated_formatted}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
