/*
 *
 * `SalesDetailsPage`: `@exsys-patient-insurance/sales-details-page`.
 *
 */
import { memo, useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";
import { useGlobalProviderNo } from "@exsys-patient-insurance/app-config-store";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import { initialFormFilterValues, TABLE_COLUMNS } from "./constants";
import { SalesDetailsRecordType } from "./index.interface";

const SalesDetailsPage = () => {
  const globalProviderNo = useGlobalProviderNo();

  const {
    values: { date_from, date_to, root_organization_no },
    handleChange,
    resetForm,
  } = useFormManager({
    initialValues: initialFormFilterValues,
  });

  const { tableValuesRef, fetchTableData, setTableData } =
    useCreateTableActionsFromRefToForm<SalesDetailsRecordType>();

  const onPressSearch = useCallback(
    () =>
      fetchTableData({
        provider_no: globalProviderNo,
        date_from,
        date_to,
        root_organization_no,
      }),
    [date_from, date_to, root_organization_no, fetchTableData, globalProviderNo]
  );

  const handleClear = useCallback(() => {
    resetForm();
    setTableData([]);
  }, [setTableData, resetForm]);

  const tableSkipQuery = useCallback(
    ({ root_organization_no, provider_no }: RecordTypeWithAnyValue) =>
      !root_organization_no || !provider_no,
    []
  );

  return (
    <>
      <Flex width="100%" gap="10px" wrap="true" bordered padding="10px">
        <DatePickerField
          width="100px"
          onChange={handleChange}
          name="date_from"
          label="datefrm"
          value={date_from}
        />
        <DatePickerField
          width="100px"
          onChange={handleChange}
          name="date_to"
          label="dateto"
          value={date_to}
          min={date_from}
        />
        <SelectWithApiQuery
          label="brnch"
          name="root_organization_no"
          width="350px"
          value={root_organization_no}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_TPA_PROVIDER_LIST"
          enableNetworkCache
          apiParams={{
            provider_no: globalProviderNo,
          }}
        />

        <SearchClearIcons
          onPressClear={handleClear}
          onPressSearch={onPressSearch}
        />
      </Flex>

      <ExsysTableWithApiQuery<SalesDetailsRecordType>
        width="100%"
        // @ts-ignore we already know it takes a ref.
        ref={tableValuesRef}
        columns={TABLE_COLUMNS}
        rowKey="rowKey"
        queryApiId="QUERY_SALE_DETAILS_TABLE_DATA"
        hideTableHeaderTools={false}
        canEdit={false}
        canInsert={false}
        canDelete={false}
        withInfo={false}
        withPdf={false}
        withExcel
        skipQuery={tableSkipQuery}
        useAlignedTotalCells
      />
    </>
  );
};

export default memo(SalesDetailsPage);
