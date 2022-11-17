/*
 *
 * Types: `@exsys-patient-insurance/users-list-page`.
 *
 */
import { CapitalActiveBooleanStringType } from "@exsys-patient-insurance/types";

export type UserRecordType = {
  total: number;
  user_id: string;
  user_full_name_p: string;
  user_full_name_s: string;
  mobile_no: string;
  provider_no: number;
  provider_name: string;
  user_type: string;
  status: CapitalActiveBooleanStringType;
  dashboard: string;
  job_id: number;
  planguageid: number;
  job_description: string;
  record_status: string;
  user_password?: string;
};

export type FormUserDataType = UserRecordType & {
  user_password_confirm?: string;
  staff_id?: string;
};
