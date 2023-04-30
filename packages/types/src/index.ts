/*
 *
 * Package: `@exsys-patient-insurance/types`.
 *
 */
import { CapitalBooleanStringType, RecordType } from "./base.interface";

export interface BaseSvgProps {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export type ModalToggleTypeForRef = {
  handleClose: () => void;
  handleOpen: () => void;
  toggle: () => void;
};

export type ModalTogglerRef = React.MutableRefObject<
  ModalToggleTypeForRef | undefined
>;

export interface PrivilegeItem {
  f_insert?: CapitalBooleanStringType;
  f_update?: CapitalBooleanStringType;
  f_delete?: CapitalBooleanStringType;
}

export interface AppConfigStateType {
  language_id: number;
  authorization: string;
  isRightToLeft: boolean;
  user_full_name: string[];
  login_staff_id: string;
  user_type: string;
  job_id: number;
  provider_category: string;
  provider_no?: number;
  provider_name?: string;
  invoice_dept_code?: number;
  dashboard?: string;
  privileges: RecordType<PrivilegeItem>;
  homePageUrl: string;
  loggedInUserName: string;
  client_id: number;
  report_server_url: string;
  report_server_userid: string;
  account_no?: string;
  tpa_use_inpatient?: CapitalBooleanStringType;
  tpa_use_emergency?: CapitalBooleanStringType;
}

export * from "./base.interface";
export * from "./form-field.interface";
export * from "./network.interface";
export * from "./styledHelpers.interface";
export * from "./table.interface";
export * from "./downloadExcel.interface";
export * from "./file-upload.interface";
export * from "./swipe-views.interface";
export * from "./carousel.interface";
export * from "./document.interface";
