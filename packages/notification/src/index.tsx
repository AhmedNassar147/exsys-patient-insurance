/*
 *
 * Package: `@exsys-patient-insurance/notification`.
 *
 */
import {
  memo,
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import CloseIcon from "@exsys-patient-insurance/close-icon";
import {
  Container,
  NotificationItem,
  NotificationDescription,
  NotificationTitle,
  StyledButton,
} from "./styled";
import {
  NotificationItemProps,
  UseNotificationRefType,
} from "./index.interface";

const Notification = (
  _: React.PropsWithChildren<{}>,
  ref: UseNotificationRefType
) => {
  const [notificationList, setNotificationList] = useState<
    NotificationItemProps[]
  >([]);

  const deleteNotification = useCallback(
    (index: number) => {
      const notificationListItem = notificationList.filter(
        (_, itemIndex) => itemIndex !== index
      );
      setNotificationList(notificationListItem);
    },
    [notificationList, setNotificationList]
  );

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (notificationList.length) {
      const [{ duration }] = notificationList;

      interval = setInterval(() => {
        deleteNotification(0);
      }, duration || 3500);
    }

    return () => clearInterval(interval);
  }, [notificationList, deleteNotification]);

  const onClickDeleteButton = useCallback(
    (index: number) => () => deleteNotification(index),
    [deleteNotification]
  );

  const addNotification = useCallback(
    (item: NotificationItemProps) =>
      setNotificationList((previous) => [...previous, item]),
    [setNotificationList]
  );

  useImperativeHandle(ref, () => ({
    addNotification,
  }));

  return (
    <Container>
      {!!notificationList.length &&
        notificationList.map(({ message, description, type }, index) => (
          <NotificationItem key={index} type={type}>
            <StyledButton onClick={onClickDeleteButton(index)}>
              <CloseIcon size="1.4em" />
            </StyledButton>
            <div>
              <NotificationTitle>{message}</NotificationTitle>
              {description && (
                <NotificationDescription>{description}</NotificationDescription>
              )}
            </div>
          </NotificationItem>
        ))}
    </Container>
  );
};

// @ts-ignore ignore this for now.
export default memo(forwardRef(Notification));
export * from "./useNotification";
export type { AddNotificationType } from "./index.interface";
