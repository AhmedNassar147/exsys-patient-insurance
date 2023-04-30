/*
 *
 * Types: `@exsys-patient-insurance/select-with-add-action`.
 *
 */
import { SelectFieldProps } from "@exsys-patient-insurance/select-field";
import {
  ClientSelectDataOptions,
  ClientSelectAddedItemOptions,
  RunQueryFnType,
} from "@exsys-patient-insurance/types";

export interface DropDownFooterProps {
  onSaveItem: (newItem: ClientSelectAddedItemOptions) => void;
  oneInput?: boolean;
}

export type SelectWithAddActionProps = Omit<
  SelectFieldProps,
  "options" | "mode" | "dropDownFooter" | "height"
> & {
  onAddItem?: (newItem: ClientSelectAddedItemOptions) => void;
  dataOptions?: ClientSelectDataOptions;
  oneInput?: boolean;
  label?: string;
  width?: string;
};

export type UseClientCodeQueryResultType = {
  handleAddNewCodeItem: (newItem: ClientSelectAddedItemOptions) => void;
  postCodeNewItemLoading: boolean;
  queryLoading: boolean;
  loadCodeData: RunQueryFnType<ClientSelectDataOptions>;
  clientOptionsData: ClientSelectDataOptions;
};
