/*
 *
 * Component: `BaseSelectWithAddAction`.
 *
 */
import { memo, useMemo } from "react";
import SelectField from "@exsys-patient-insurance/select-field";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import { DEFAULT_CLIENT_SELECT_DATA_OPTIONS } from "../constants";
import { SelectWithAddActionProps } from "../index.interface";

const LazyLoadedDropDownFooter = createLazyLoadedComponent(
  () =>
    import(
      "./DropDownFooter" /* webpackChunkName: "exsys-patient-insurance.select-with-add-action.DropDownFooter" */
    )
);

const BaseSelectWithAddAction = ({
  dataOptions,
  value,
  oneInput,
  onAddItem,
  ...props
}: SelectWithAddActionProps) => {
  const { canInsert, data, multi } = {
    ...DEFAULT_CLIENT_SELECT_DATA_OPTIONS,
    ...dataOptions,
  };
  const mode = multi ? "multiple" : undefined;

  const normalizeValue = useMemo(() => {
    return multi
      ? Array.isArray(value)
        ? value
        : value
        ? [value]
        : []
      : value;
  }, [multi, value]);

  const dropDownFooter = useMemo(
    () => (
      <LazyLoadedDropDownFooter
        shouldMountChunk={canInsert}
        oneInput={oneInput}
        onSaveItem={onAddItem}
      />
    ),
    [onAddItem, oneInput, canInsert]
  );

  return (
    <SelectField
      {...props}
      value={normalizeValue}
      mode={mode}
      options={data}
      dropDownFooter={dropDownFooter}
    />
  );
};

export default memo(BaseSelectWithAddAction);
