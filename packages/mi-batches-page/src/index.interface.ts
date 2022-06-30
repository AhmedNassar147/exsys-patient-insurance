/*
 *
 * Types: `@exsys-patient-insurance/mi-batches-page`.
 *
 */
export interface MiBatchesTableRecordType {
  total: number;
  batch_no: string;
  batch_date: string;
  start_date: string;
  end_date: string;
  receive_date: string;
  adt_no_of_clms: number;
  adt_clmd_grss: number;
  adt_clmd_net: number;
  opd_no_of_clms: number;
  opd_clmd_grss: number;
  opd_clmd_net: number;
  clmd_amt_grss: number;
  clmd_amt_net: number;
  tpa_name?: string;
}
