/*
 *
 * `useNotification`: `@exsys-patient-insurance/notification`.
 *
 */
import { useRef, useCallback } from "react";
import {
  NotificationItemProps,
  UseNotificationRefValuesType,
} from "./index.interface";

const useNotification = () => {
  const notificationRef = useRef<UseNotificationRefValuesType>(null);

  const addNotification = useCallback(
    (item: NotificationItemProps) =>
      notificationRef.current?.addNotification(item),
    []
  );

  return [notificationRef, addNotification] as const;
};

export { useNotification };
