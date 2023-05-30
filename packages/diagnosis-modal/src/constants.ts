/*
 *
 * Constants: `@exsys-patient-insurance/diagnosis-modal`.
 *
 */
import { DiagnosisItemType } from "./index.interface";

export const RADIO_OPTIONS = [
  {
    value: "F",
    label: "serchbyfav",
  },
  {
    value: "W",
    label: "alwserchbywrd",
  },
  {
    value: "C",
    label: "serchcode",
  },
];

export const initialState = {
  search_type: "F",
  search_value: "",
  data: [] as DiagnosisItemType[],
};
