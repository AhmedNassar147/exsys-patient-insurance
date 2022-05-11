/*
 *
 * Types: `@exsys-clinio/doctors-search-results-list`.
 *
 */
import { CapitalBooleanStringType } from "@exsys-clinio/types";

export interface DoctorInfoType {
  clinical_entity_no: number;
  clinical_name: string;
  specialty_name: string;
  nationality_flag: string;
  seniority_level: string;
  image_id: string;
  doctor_id: string;
  title_id: string;
  gender_id: string;
  serve_first_arrived: CapitalBooleanStringType;
  about_doctor: string;
  clinic_time: string;
  session_code: number;
}
