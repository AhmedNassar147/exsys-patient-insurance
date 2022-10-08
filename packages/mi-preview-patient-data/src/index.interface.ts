/*
 *
 * Types: `@exsys-patient-insurance/mi-preview-patient-data`.
 *
 */

export interface PatientMaxLimitsType {
  maxLimits: number;
  patientLimits: PatientLimitsType;
}
export interface PatientLimitsType {
  policy_no: string;
  class_code: string;
  patient_card_no: string;
  patient_name: string;
  addition_approvals: number;
  max_benefit: number;
  max_opd: number;
  max_adt: number;
  max_chronic: number;
  max_pre_exist: number;
  max_family: number;
  max_per_day: number;
  max_opd_patient_copay: number;
  max_room_cost: number;
  actual_benefit: number;
  actual_opd: number;
  actual_adt: number;
  actual_chronic: number;
  actual_pre_exist: number;
  actual_family: number;
  actual_dental: number;
  actual_obgyn: number;
  actual_optical: number;
  reserve_benefit: number;
  reserve_opd: number;
  reserve_adt: number;
  reserve_chronic: number;
  reserve_pre_exist: number;
  reserve_family: number;
  reserve_dental: number;
  reserve_obgyn: number;
  reserve_optical: number;
}
