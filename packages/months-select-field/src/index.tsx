/*
 *
 * Package: `@exsys-patient-insurance/months-select-field`.
 *
 */
import { memo } from "react";
import SelectField, {
  SelectFieldProps,
} from "@exsys-patient-insurance/select-field";
import { MONTH_OPTIONS } from "./constants";

export type MonthsSelectFieldProps = Omit<SelectFieldProps, "options">;

const MonthsSelectField = (props: MonthsSelectFieldProps) => (
  <SelectField {...props} options={MONTH_OPTIONS} />
);
MonthsSelectField.defaultProps = {
  width: "80px",
  label: "month",
};

export default memo(MonthsSelectField);
