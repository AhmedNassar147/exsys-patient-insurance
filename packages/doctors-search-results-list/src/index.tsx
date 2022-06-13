/*
 *
 *
 * Package: `@exsys-patient-insurance/doctors-search-results-list`.
 *
 */
import { memo } from "react";
import AsyncAwaiter from "@exsys-patient-insurance/async-awaiter";
import { spacings } from "@exsys-patient-insurance/theme-values";
import BaseDoctorInfo from "./partials/BaseDoctorInfo";
import { DoctorInfoType } from "./index.interface";

interface DoctorsResultListProps {
  doctorsDataList?: DoctorInfoType[];
  loading?: boolean;
  periodType: string;
}

const DoctorsResultList = memo(
  ({ doctorsDataList, loading, periodType }: DoctorsResultListProps) => {
    const doctorsDataLength = doctorsDataList?.length ?? 0;

    return (
      <AsyncAwaiter
        loading={loading}
        height="unset"
        setWrapperAsColumn
        noData={!doctorsDataLength}
        margin={`${spacings.sp4} 0`}
      >
        {!!doctorsDataLength &&
          doctorsDataList?.map((item) => (
            <BaseDoctorInfo
              key={item.session_code}
              doctorInfo={item}
              periodType={periodType}
            />
          ))}
      </AsyncAwaiter>
    );
  }
);

export default memo(DoctorsResultList);
export type { DoctorInfoType };
