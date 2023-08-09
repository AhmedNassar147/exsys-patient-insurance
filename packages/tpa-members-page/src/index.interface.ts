/*
 *
 * Types: `@exsys-patient-insurance/tpa-members-page`.
 *
 */

export interface TpaMembersRecordType {
  total: number;
  provider_name: string;
  provider_account_name: string;
  card_no: string;
  patient_name: string;
  form_no: number;
  ucaf_id?: number;
  gross_price: number;
  // ucafe_date: string;
  disc: number;
  copay: number;
  net_price: number;
  provider_share: number;
  batch_no?: number;
  provider_number: number;
}
