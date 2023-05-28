/*
 *
 * Types: `@exsys-patient-insurance/services-modal`.
 *
 */
import {
  RecordTypeWithAnyValue,
  CapitalBooleanStringType,
} from "@exsys-patient-insurance/types";

export interface ServiceRequestItemType {
  total: number;
  service_id: string;
  service_name: string;
  price: number;
  price_disc_prc: number;
  copay: number;
  reimbursement_add_copay: number;
  approval: string;
  specialty_type: string;
  calc_flag?: CapitalBooleanStringType;
}

export type OnSelectServiceType = (
  item: ServiceRequestItemType,
  inClinicService: boolean
) => void;

export interface ServicesModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectService: OnSelectServiceType;
  searchParams?: RecordTypeWithAnyValue;
  initialInClinicService?: boolean;
  showInClinicServiceCheckbox?: boolean;
}
