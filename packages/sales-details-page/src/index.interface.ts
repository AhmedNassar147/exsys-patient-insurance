/*
 *
 * Types: `@exsys-patient-insurance/sales-details-page`.
 *
 */
export interface SalesDetailsRecordType {
  total: number;
  provider_name: string;
  provider_account_name: string;
  card_no: string;
  patient_name: string;
  form_no: number;
  ucafe_date: string;
  service_code: string;
  service_name: string;
  qty: number;
  unit_price: number;
  unit_disc: number;
  unit_copay: number;
  total_price: number;
  provider_share: number;
}
