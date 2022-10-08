/*
 *
 * Types: `@exsys-patient-insurance/mi-ucaf-page`.
 *
 */
import { CapitalBooleanStringType } from "@exsys-patient-insurance/types";

export interface UcafPatientDataPropType {
  rowKey: number;
  root_organization_no: string;
  organization_name: string;
  organizationUrl: string;
  patient_card_no: string;
  patient_name: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  nationality: string;
  patientImgUrl: string;
  phone_no: string;
  national_id: string;
  status: string;
  start_date: string;
  end_date: string;
  policy_no: string;
  member_of: string;
  member_of_id: string;
  plan: string;
  insurance_company_no: number;
  subsidiary: string;
  relationship: string;
  class: string;
  doctor_id: string;
  declaration_file_path: string;
  declaration_flag: CapitalBooleanStringType;
  declaration_req: CapitalBooleanStringType;
}
