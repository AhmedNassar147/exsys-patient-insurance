/*
 *
 * `MiBatchesPage`: `@exsys-patient-insurance/mi-batches-page`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import ClearSearchIcon from "@exsys-patient-insurance/search-clear-icons";
import MonthsSelectField from "@exsys-patient-insurance/months-select-field";
import YearsSelectField from "@exsys-patient-insurance/years-select-field";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import { useGlobalProviderNo } from "@exsys-patient-insurance/app-config-store";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import Button from "@exsys-patient-insurance/button";
import { onChangeEvent } from "@exsys-patient-insurance/types";
import CreateNewBatchModal from "./partials/CreateNewBatchModal";
import {
  initialValues,
  RADIO_OPTIONS_TYPES,
  TABLE_COLUMNS,
  currentGeneratedMonth,
} from "./constants";
import { MiBatchesTableRecordType } from "./index.interface";

const MiBatchesPage = () => {
  const globalProviderNo = useGlobalProviderNo();

  const tpaProvidersParams = useMemo(
    () => ({ provider_no: globalProviderNo }),
    [globalProviderNo]
  );

  const {
    values: { month, year, type, tpa_no },
    handleChange,
    handleChangeMultipleInputs,
    resetForm,
  } = useFormManager({
    initialValues,
  });

  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const { tableValuesRef, fetchTableData, resetTableData } =
    useCreateTableActionsFromRefToForm<MiBatchesTableRecordType>();

  const handleChangeSelectionCheck: onChangeEvent = useCallback(
    ({ name, value }) => {
      const isAllTpa = value === "A";

      handleChangeMultipleInputs({
        [name]: value,
        month: isAllTpa ? currentGeneratedMonth : "",
        tpa_no: "",
      });

      resetTableData();
    },
    [handleChangeMultipleInputs, resetTableData]
  );

  const onPressClear = useCallback(() => {
    resetForm();
    resetTableData();
  }, [resetForm, resetTableData]);

  const handleSearch = useCallback(
    () =>
      fetchTableData({
        year,
        month,
        provider_no: globalProviderNo,
        tpa_no,
        type,
      }),
    [year, month, fetchTableData, globalProviderNo, tpa_no]
  );

  const isAllTpa = type === "A";

  const computedColumns = useMemo(() => {
    const [_, ...restColumns] = TABLE_COLUMNS;

    return isAllTpa ? TABLE_COLUMNS : restColumns;
  }, [isAllTpa]);

  return (
    <>
      <Flex width="100%" align="center" bordered padding="10px" gap="10px">
        <Flex flex={1} align="center" gap="20px" wrap="true">
          <SelectionCheckGroup
            label="type"
            labelType="inlined"
            width="auto"
            name="type"
            value={type}
            onChange={handleChangeSelectionCheck}
            options={RADIO_OPTIONS_TYPES}
            mode="radio"
          />

          {!isAllTpa && (
            <SelectWithApiQuery
              label="tpaname"
              width="320px"
              name="tpa_no"
              enableNetworkCache
              preselectFirstKey
              queryType="query"
              apiOrCodeId="QUERY_TPA_PROVIDER_LIST"
              value={tpa_no}
              onChange={handleChange}
              apiParams={tpaProvidersParams}
              checkAllParamsValuesToQuery
            />
          )}

          <YearsSelectField
            name="year"
            value={year}
            onChange={handleChange}
            howManyYearsBefore={4}
            howManyYearsAfter={0}
          />

          {isAllTpa && (
            <MonthsSelectField
              name="month"
              value={month}
              onChange={handleChange}
            />
          )}

          <ClearSearchIcon
            onPressClear={onPressClear}
            onPressSearch={handleSearch}
          />
        </Flex>

        {!isAllTpa && (
          <Button
            label="creatnewbatch"
            type="primary"
            shape="round"
            onClick={handleOpen}
          />
        )}
      </Flex>

      <ExsysTableWithApiQuery<MiBatchesTableRecordType>
        // @ts-ignore we already know it takes a ref.
        ref={tableValuesRef}
        columns={computedColumns}
        rowKey="batch_no"
        queryApiId="QUERY_MI_BATCHES_TABLE_DATA"
        useAlignedTotalCells
      />

      <CreateNewBatchModal
        visible={visible}
        handleClose={handleClose}
        handleSaveSuccuss={handleSearch}
      />
    </>
  );
};

export default memo(MiBatchesPage);
