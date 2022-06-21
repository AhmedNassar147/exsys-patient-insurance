/*
 *
 * Types: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { CapitalBooleanStringType } from "@exsys-patient-insurance/types";

export interface PatientItemRecordType {
  age: string;
  dateOfBirth: string;
  end_date: string;
  gender: string;
  insurance_company_no: number;
  national_id: string;
  nationality: string;
  organizationUrl: string;
  organization_name: string;
  patientImgUrl: string;
  patient_card_no: string;
  patient_name: string;
  phone_no: string;
  plan: string;
  policy_no: string;
  relationship: string;
  root_organization_no: string;
  start_date: string;
  status: string;
  subsidiary: string;
  total: number;
  class?: string;
  member_of?: string;
}

export interface RequestDetailsType {
  root_organization_no: string;
  doctor_provider_no: number;
  doctor_provider_name: string;
  doctor_department_id: number;
  doctor_department_name: number;
  ucaf_id?: number;
  ucafe_date?: string;
  complain?: string;
  signs?: string;
  is_chronic?: CapitalBooleanStringType;
  primary_diag_code?: number;
  primary_diagnosis?: string;
  ucafe_type?: CapitalBooleanStringType;
  claim_flag?: string;
  attendance_type?: string;
  provider_notes?: string;
}

export interface RequestTableRecordType {
  total: number;
  ucaf_dtl_pk: number;
  service_code: string;
  service_name: string;
  qty: number;
  price: number;
  approval_reply: string;
  approval_reply_name: string;
  approved_quantity: number;
  reply_notes: string;
  delivery_qty: number;
  delivery_date: string;
  delivery_doc_no: string;
  status: string;
  status_name: string;
  provider_notes?: string;
}

export interface RequestsDataType {
  details: RequestDetailsType;
  data: RequestTableRecordType[];
}

export type ServiceItemValuesForPostApiType = RequestTableRecordType & {
  record_status: string;
};
