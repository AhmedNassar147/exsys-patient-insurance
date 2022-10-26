/*
 *
 * Types: `@exsys-patient-insurance/find-patient-form`.
 *
 */
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
