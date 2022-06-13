/*
 *
 * Package: `@exsys-patient-insurance/doctors-search-page`.
 *
 */
import { memo, useCallback, useState } from "react";
import DoctorsSearchForm, {
  INITIAL_FORM_STATE as initialSearchParams,
} from "@exsys-patient-insurance/doctors-search-form";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import useFromManager from "@exsys-patient-insurance/form-manager";
import DoctorsResultList, {
  DoctorInfoType,
} from "@exsys-patient-insurance/doctors-search-results-list";
import type {
  OnResponseActionType,
  RecordType,
} from "@exsys-patient-insurance/types";

const DoctorsSearchPage = () => {
  const [doctorsData, setDoctorsData] = useState<DoctorInfoType[]>([]);
  const { values: searchFormValues, handleChange } = useFromManager({
    initialValues: initialSearchParams,
  });

  const handleDoctorsResponse: OnResponseActionType<
    RecordType<DoctorInfoType[]>
  > = useCallback(({ apiValues, error }) => {
    const { data } = apiValues;
    setDoctorsData(() => (!!error || !data ? [] : data));
  }, []);

  const { runQuery, loading } = useBasicQuery({
    apiId: "QUERY_CLINICAL_LIST",
    runQueryWhenLanguageChanged: true,
    callOnFirstRender: true,
    onResponse: handleDoctorsResponse,
    params: searchFormValues,
  });

  const onClickSearch = useCallback(() => runQuery(), [runQuery]);

  const { period_type } = searchFormValues;

  return (
    <>
      <DoctorsSearchForm
        onSearch={onClickSearch}
        loading={loading}
        handleChange={handleChange}
        values={searchFormValues}
      />
      <DoctorsResultList
        loading={loading}
        doctorsDataList={doctorsData}
        periodType={period_type}
      />
    </>
  );
};

export default memo(DoctorsSearchPage);
