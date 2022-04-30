import { useSelector } from "react-redux";

import NotificationList from "./NotificationList";
import NotificationItem from "./NotificationItem";

export const Notifications = () => {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  return (
    <NotificationList>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </NotificationList>
  );
};
