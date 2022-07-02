/*
 *
 * Package: `@exsys-patient-insurance/years-select-field`.
 *
 */
import { useMemo, memo } from "react";
import SelectField, {
  SelectFieldProps,
} from "@exsys-patient-insurance/select-field";
import {
  GenerateYearsBasedOnGivenParamsType,
  generateYearsBasedOnGivenParams,
} from "@exsys-patient-insurance/helpers";

export type YearsSelectFieldsProps = Omit<SelectFieldProps, "options"> &
  GenerateYearsBasedOnGivenParamsType;

const YearsSelectField = ({
  startAtYear,
  howManyYearsBefore,
  howManyYearsAfter,
  includeStartingYear,
  ...props
}: YearsSelectFieldsProps) => {
  const yearsOptions = useMemo(
    () =>
      generateYearsBasedOnGivenParams({
        startAtYear,
        howManyYearsBefore,
        howManyYearsAfter,
        includeStartingYear,
      })
        .map((year) => ({
          key: year,
          value: year,
        }))
        .reverse(),
    [startAtYear, howManyYearsBefore, howManyYearsAfter, includeStartingYear]
  );

  return <SelectField {...props} options={yearsOptions} />;
};

YearsSelectField.defaultProps = {
  width: "80px",
  label: "year",
  includeStartingYear: true,
  howManyYearsBefore: 1,
  howManyYearsAfter: 2,
};

export default memo(YearsSelectField);
