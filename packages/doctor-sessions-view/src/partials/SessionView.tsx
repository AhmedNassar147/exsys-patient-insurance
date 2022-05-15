/*
 *
 * Component: `SessionView`.
 *
 */

import { memo, useState, useCallback } from "react";
import Text from "@exsys-clinio/text";
import { colors } from "@exsys-clinio/theme-values";
import LazyLoadedBookingModal from "@exsys-clinio/booking-modal";
import {
  SessionViewWrapper,
  AppointmentsWrapper,
  BookingTimeItem,
} from "../styled";
import { SessionViewProps, AppointmentShapeType } from "../index.interface";

const { appPrimary } = colors;

const SessionView = ({
  date,
  freeSlot,
  doctorImageUrl,
  clinicalName,
  onBookingDoneSuccessfully,
}: SessionViewProps) => {
  const [currentAppointment, setAppointment] = useState<
    AppointmentShapeType | undefined
  >();

  const setAppointmentData = useCallback(
    (appointmentData?: AppointmentShapeType) => () =>
      setAppointment(() => appointmentData),
    []
  );

  return (
    <SessionViewWrapper>
      <Text
        children={date}
        width="95%"
        ellipsis="true"
        disableTranslation
        align="center"
        color={appPrimary}
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
              disableTranslation
              onClick={setAppointmentData(item)}
            >
              {bookingTime}
            </BookingTimeItem>
          );
        })}
      </AppointmentsWrapper>

      <LazyLoadedBookingModal
        shouldMountChunk={!!currentAppointment}
        visible={!!currentAppointment}
        onClose={setAppointmentData()}
        appointmentId={currentAppointment?.appointmentId}
        bookingTime={currentAppointment?.bookingTime}
        doctorImageUrl={doctorImageUrl}
        bookingDate={date}
        clinicalName={clinicalName}
        onBookingDoneSuccessfully={onBookingDoneSuccessfully}
      />
    </SessionViewWrapper>
  );
};

export default memo(SessionView);
