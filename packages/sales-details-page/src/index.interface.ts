/*
 *
 * Types: `@exsys-patient-insurance/sales-details-page`.
 *
 */
export interface DetailsDataRecordProps {
  rowKey: number;
  service_code: string;
  service_name: string;
  qty: number;
  unit_price: number;
  unit_disc: number;
  unit_copay: number;
  total_price: number;
  provider_share: number;
}

export interface SalesDetailsRecordType {
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
  dtl_data: DetailsDataRecordProps[];
}
