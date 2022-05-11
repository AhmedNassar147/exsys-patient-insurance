/*
 *
 * Component: `SessionView`.
 *
 */

import { memo } from "react";
import Text from "@exsys-clinio/text";
import { colors } from "@exsys-clinio/theme-values";
import {
  SessionViewWrapper,
  AppointmentsWrapper,
  BookingTimeItem,
} from "../styled";
import { SessionViewProps } from "../index.interface";

const SessionView = ({ date, freeSlot }: SessionViewProps) => (
  <SessionViewWrapper>
    <Text
      children={date}
      width="95%"
      ellipsis="true"
      disableTranslation
      align="center"
      color={colors.appPrimary}
      fontSize="ff7"
      title={date}
    />

    <AppointmentsWrapper>
      {freeSlot?.map((item) => {
        const { appointmentId, bookingTime } = item;

        return (
          <BookingTimeItem
            key={appointmentId}
            title={bookingTime}
            fontSize="ff8"
          >
            {bookingTime}
          </BookingTimeItem>
        );
      })}
    </AppointmentsWrapper>
  </SessionViewWrapper>
);

export default memo(SessionView);
