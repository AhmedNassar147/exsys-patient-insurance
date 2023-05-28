/*
 *
 * Component: `FindMedicationProperQuantityView`.
 *
 */
import { memo, useCallback } from "react";
import InputNumber from "@exsys-patient-insurance/input-number";
import useFormManager from "@exsys-patient-insurance/form-manager";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import Flex from "@exsys-patient-insurance/flex";
import { OnResponseActionType } from "@exsys-patient-insurance/types";

const initialValues = {
  dosage: undefined,
  times: undefined,
  days: undefined,
};

interface FindMedicationProperQuantityViewProps {
  onProperQtyFound: (qty: number) => void;
  serviceCode: string;
}

const FindMedicationProperQuantityView = ({
  onProperQtyFound,
  serviceCode,
}: FindMedicationProperQuantityViewProps) => {
  const {
    values: { dosage, times, days },
    handleChange,
  } = useFormManager({
    initialValues,
  });

  const onResponse: OnResponseActionType<any> = useCallback(
    ({ apiValues }) => {
      const { qty } = apiValues || {};
      onProperQtyFound(qty || 1);
    },
    [onProperQtyFound]
  );

  const { loading, runQuery } = useBasicQuery({
    apiId: "QUERY_PRODUCT_QUANTITY_BY_DOSAGE_DATA",
    callOnFirstRender: false,
    runQueryWhenLanguageChanged: false,
    disableParamsChangeCheck: true,
    onResponse,
  });

  const findProductProperQty = useCallback(
    () =>
      runQuery({
        dosage,
        times,
        days,
        service_code: serviceCode,
      }),
    [days, dosage, runQuery, serviceCode, times]
  );

  const searchDisabled = !dosage || !times || !days || !serviceCode;

  return (
    <Flex
      width="calc(100% - 45% - 20px)"
      align="center"
      padding="5px"
      gap="5px"
      bordered
    >
      <InputNumber
        label="dsg"
        width="29%"
        name="dosage"
        onChange={handleChange}
        value={dosage}
        min={0}
        onPressEnter={!searchDisabled ? findProductProperQty : undefined}
      />
      <InputNumber
        label="tims"
        width="29%"
        name="times"
        onChange={handleChange}
        value={times}
        min={0}
        max={6}
        onPressEnter={!searchDisabled ? findProductProperQty : undefined}
      />
      <InputNumber
        label="daysno"
        width="29%"
        name="days"
        onChange={handleChange}
        value={days}
        min={0}
        max={90}
        onPressEnter={!searchDisabled ? findProductProperQty : undefined}
      />

      <SearchClearIcons
        noClearIcon
        searchLabel=""
        onPressSearch={findProductProperQty}
        disabled={searchDisabled}
        loading={loading}
      />
    </Flex>
  );
};

export default memo(FindMedicationProperQuantityView);
