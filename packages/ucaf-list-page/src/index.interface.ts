/*
 *
 * Types: `@exsys-patient-insurance/ucaf-list-page`.
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
  declaration_file_path?: string;
  declaration_req?: string;
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
  primary_diag_code?: number;
  primary_diagnosis?: string;
  ucafe_type?: string;
  claim_flag?: string;
  provider_notes?: string;
  reviwed_date?: string;
  chronic_period_months?: number;
  chronic_delivery_frequency?: number;
  stamped?: CapitalBooleanStringType;
  agreed?: CapitalBooleanStringType;
  expected_days?: number;
  expected_amount?: number;
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
  ucaf_delivery_pk?: string;
  canDeliverRequest?: CapitalBooleanStringType;
  record_status?: string;
  total_price?: number;
  due_delivery_date?: string;
  due_delivery_qty?: number;
  last_delivery_date?: string;
  provider_no?: number;
}

export interface RequestsDataType {
  details: RequestDetailsType;
  data: RequestTableRecordType[];
}

export type ServiceItemValuesForPostApiType = RequestTableRecordType & {
  record_status: string;
  inClinicService?: boolean;
};

export type SaveAttachmentEventType = {
  imageType?: string;
  imageID?: string;
  onSuccess?: (imageFileName: string) => Promise<void>;
};
