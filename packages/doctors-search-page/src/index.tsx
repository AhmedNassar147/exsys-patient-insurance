/*
 *
 * Package: `@exsys-clinio/doctors-search-page`.
 *
 */
import { memo, useCallback, useState } from "react";
import DoctorsSearchForm, {
  INITIAL_FORM_STATE as initialSearchParams,
} from "@exsys-clinio/doctors-search-form";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import useFromManager from "@exsys-clinio/form-manager";
import DoctorsResultList, {
  DoctorInfoType,
} from "@exsys-clinio/doctors-search-results-list";
import type { OnResponseActionType, RecordType } from "@exsys-clinio/types";

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
