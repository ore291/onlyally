import clsx from "clsx";
import { motion, useIsPresent, Variants } from "framer-motion";
import { useTimeoutFn, useUpdateEffect } from "react-use";
import { useDispatch, useSelector } from "react-redux";

import { MdCheckCircleOutline, MdInfoOutline } from "react-icons/md";

import { BsExclamationTriangle } from "react-icons/bs";

import { dismissNotification } from "../../store/slices/notificationsSlice";

/**
 * To handle different positions of the notification, we need to change the
 * animation direction based on whether it is rendered in the top/bottom or left/right.
 *
 * @param position - The position of the Notification
 * @param fromEdge - The length of the position from the edge in pixels
 */

const getMotionDirectionAndPosition = (position, fromEdge = 24) => {
  const directionPositions = ["top", "bottom"];
  const factorPositions = ["top-right", "bottom-right"];

  const direction = directionPositions.includes(position) ? "y" : "x";
  let factor = factorPositions.includes(position) ? 1 : -1;

  if (position === "bottom") factor = 1;

  return {
    [direction]: factor * fromEdge,
  };
};

const motionVariants = {
  initial: (position) => {
    return {
      opacity: 0,
      ...getMotionDirectionAndPosition(position),
    };
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (position) => {
    return {
      opacity: 0,
      ...getMotionDirectionAndPosition(position, 30),
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    };
  },
};

const notificationStyleVariants = {
  success: "bg-green-500 border-green-600",
  error: "bg-red-500 border-red-600",
  info: "bg-purple-500 border-purple-600",
  warning: "bg-yellow-500 border-yellow-600",
};

const notificationIcons = {
  success: <MdCheckCircleOutline />,
  error: <BsExclamationTriangle />,
  info: <MdInfoOutline />,
  warning: <BsExclamationTriangle />,
};

const closeButtonStyleVariants = {
  success: "hover:text-red-500 active:bg-green-600",
  error: "hover:text-red-500 active:bg-red-600",
  info: "hover:text-red-500 active:bg-purple-600",
  warning: "hover:text-red-500 active:bg-yellow-600",
};

const NotificationItem = ({
  notification: { id, autoHideDuration, message, onClose, type = "success" },
}) => {
  const dispatch = useDispatch();
  const duration = useSelector((state) => state.notifications.autoHideDuration);
  const isPresent = useIsPresent();
  const position = useSelector((state) => state.notifications.position);

  // Handle dismiss of a single notification
  const handleDismiss = () => {
    if (isPresent) {
      dispatch(dismissNotification(id));
    }
  };

  // Call the dismiss function after a certain timeout
  const [, cancel, reset] = useTimeoutFn(
    handleDismiss,
    autoHideDuration ?? duration
  );

  // Reset or cancel dismiss timeout based on mouse interactions
  const onMouseEnter = () => cancel();
  const onMouseLeave = () => reset();

  // Call `onDismissComplete` when notification unmounts if present
  useUpdateEffect(() => {
    if (!isPresent) {
      onClose?.();
    }
  }, [isPresent]);

  return (
    <>
      <motion.li
        className={clsx(
          "flex w-max items-center shadow px-4 py-2 rounded border transition-colors duration-100 min-w-[260px] text-sm pointer-events-auto",
          notificationStyleVariants[type]
        )}
        animate="animate"
        exit="exit"
        layout="position"
        layoutId={id}
        custom={position}
        variants={motionVariants}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex gap-2 items-center text-white font-bold">
          {notificationIcons[type]}
          <span className="max-w-sm font-medium">{message}</span>
        </div>

        <div className="pl-4 ml-auto">
          <button
            onClick={handleDismiss}
            className={clsx(
              "p-1 rounded transition-colors duration-100",
              closeButtonStyleVariants[type]
            )}
          >
            <div>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </motion.li>
    </>
  );
};

export default NotificationItem;
