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

export interface SessionViewProps {
  date: string;
  session_code: number;
  maxWalking: number;
  walking: number;
  session_length: number;
  appointment_type: CapitalBooleanStringType;
  freeSlot: AppointmentShapeType[];
}
