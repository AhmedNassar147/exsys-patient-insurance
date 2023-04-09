/*
 *
 * Types: `@exsys-patient-insurance/ucaf-list-page`.
 *
 */
import { CapitalBooleanStringType } from "@exsys-patient-insurance/types";

export interface RequestDetailsType {
  root_organization_no: string;
  doctor_provider_no: number;
  doctor_provider_name: string;
  doctor_name?: string;
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
  written_by_doctor?: CapitalBooleanStringType;
  admission_date?: string;
  discharge_date?: string;
  patientExceedLimit?: CapitalBooleanStringType;
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
  is_system_approved: CapitalBooleanStringType;
  approved_quantity?: number;
  reply_notes?: string;
  internal_notes?: string;
  delivery_qty: number;
  delivery_date: string;
  delivery_doc_no: string;
  status: string;
  status_name: string;
  provider_notes?: string;
  ucaf_delivery_pk?: string;
  canDeliverRequest?: CapitalBooleanStringType;
  record_status: string;
  due_delivery_date?: string;
  due_delivery_qty?: number;
  last_delivery_date?: string;
  provider_no?: number;
  patientShare?: number;
  unit_discount?: number;
  specialty_type?: string;
  patient_share_prc?: number;
  price_disc_prc?: number;
  total_price?: number;
  total_patient_share?: number;
  total_patient_discount?: number;
  original_price?: number;
  original_service_code?: string;
  new_request_price?: number;
}
export interface RequestsDataType {
  details: RequestDetailsType;
  data: RequestTableRecordType[];
  isNewConsultation: boolean;
  hasPatientExceededLimits: boolean;
}

export type ServiceItemValuesForPostApiType = RequestTableRecordType & {
  inClinicService?: boolean;
  approval?: string;
  forcedStatus?: string;
  new_request_price?: number;
};

export type SaveAttachmentEventType = {
  imageType?: string;
  imageID?: string;
  onSuccess?: (imageFileName: string) => Promise<void>;
};
