/*
 *
 * Types: `@exsys-clinio/doctor-sessions-view`.
 *
 */
import { CapitalBooleanStringType } from "@exsys-clinio/types";

export interface AppointmentShapeType {
  appointmentId: number;
  bookingTime: string;
}

export interface BaseSessionViewProps {
  doctorImageUrl: string;
  clinicalName: string;
}

export interface SessionViewProps extends BaseSessionViewProps {
  date: string;
  session_code: number;
  maxWalking: number;
  walking: number;
  session_length: number;
  appointment_type: CapitalBooleanStringType;
  freeSlot: AppointmentShapeType[];
  onBookingDoneSuccessfully: () => void;
}
