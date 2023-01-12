/*
 *
 * Types: `@exsys-patient-insurance/notification`.
 *
 */
export type NotificationType = "info" | "error" | "warning" | "success";

export type BaseNotificationItemProps = {
  type?: NotificationType;
};

export type NotificationItemProps = BaseNotificationItemProps & {
  message: string;
  description?: string;
  duration?: number;
};

export type AddNotificationType = (item: NotificationItemProps) => void;

export interface UseNotificationRefValuesType {
  addNotification: AddNotificationType;
}

export type UseNotificationRefType = React.MutableRefObject<
  UseNotificationRefValuesType | undefined
>;
