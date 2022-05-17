/*
 *
 * Package: `@exsys-clinio/doctors-search-form`.
 *
 */
import { memo } from "react";
import SelectWithApiQuery from "@exsys-clinio/select-with-api-query";
import SelectionCheckGroup from "@exsys-clinio/selection-check-group";
import Button from "@exsys-clinio/button";
import { onChangeEvent } from "@exsys-clinio/types";
import { DoctorsFormWrapper } from "./styled";
import { PERIOD_OPTIONS, INITIAL_FORM_STATE } from "./constants";

interface DoctorsSearchFormProps {
  onSearch: () => void;
  loading?: boolean;
  values: typeof INITIAL_FORM_STATE;
  handleChange: onChangeEvent;
}

const DoctorsSearchForm = ({
  onSearch,
  loading,
  values,
  handleChange,
}: DoctorsSearchFormProps) => {
  const { specialty_no, period_type } = values;

  return (
    <DoctorsFormWrapper>
      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="QUERY_CLINICAL_SPECIALITIES_LIST"
        name="specialty_no"
        label="spec"
        width="100%"
        value={specialty_no}
        onChange={handleChange}
        className="specialty-input"
      />

      <SelectionCheckGroup
        name="period_type"
        options={PERIOD_OPTIONS}
        value={period_type}
        mode="radio"
        width="auto"
        onChange={handleChange}
        className="period-input"
      />

      <Button
        label="srch"
        type="primary"
        onClick={onSearch}
        loading={loading}
        disabled={loading}
        className="search-button"
      />
    </DoctorsFormWrapper>
  );
};

export default memo(DoctorsSearchForm);
export { INITIAL_FORM_STATE };
