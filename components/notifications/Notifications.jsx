import { useSelector } from "react-redux";

import NotificationList from "./NotificationList";
import NotificationItem from "./NotificationItem";

export const Notifications = () => {
  const notificationsArray =
    useSelector((state) => state.notifications.notifications) || [];

  return (
    <NotificationList>
      <div>
        {notificationsArray.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    </NotificationList>
  );
};
