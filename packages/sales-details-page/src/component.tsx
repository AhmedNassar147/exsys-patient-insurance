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
import {
  useGlobalProviderNo,
  useCurrentUserType,
  useCurrentAccountNo,
} from "@exsys-patient-insurance/app-config-store";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import {
  RecordTypeWithAnyValue,
  onChangeEvent,
} from "@exsys-patient-insurance/types";
import { initialFormFilterValues, TABLE_COLUMNS } from "./constants";
import { SalesDetailsRecordType } from "./index.interface";

const SalesDetailsPage = () => {
  const globalProviderNo = useGlobalProviderNo();
  const { isManagerUser } = useCurrentUserType();
  const accountNo = useCurrentAccountNo();

  const {
    values: {
      date_from,
      date_to,
      root_organization_no,
      provider_no,
      currentPatientData: { patient_card_no },
    },
    handleChange,
    handleChangeMultipleInputs,
    resetForm,
  } = useFormManager({
    initialValues: {
      ...initialFormFilterValues,
      provider_no: isManagerUser ? "" : globalProviderNo,
    },
  });

  const { tableValuesRef, fetchTableData, setTableData } =
    useCreateTableActionsFromRefToForm<SalesDetailsRecordType>();

  const onPressSearch = useCallback(
    () =>
      fetchTableData({
        provider_no,
        date_from,
        date_to,
        root_organization_no,
        patient_card_no,
      }),
    [
      date_from,
      date_to,
      root_organization_no,
      fetchTableData,
      provider_no,
      patient_card_no,
    ]
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

  const onChangeSearchFields: onChangeEvent = useCallback(
    () =>
      handleChangeMultipleInputs({
        currentPatientData: {
          patient_card_no: "",
        },
      }),
    [handleChangeMultipleInputs]
  );

  return (
    <>
      <Flex
        width="100%"
        gap="10px"
        wrap="true"
        bordered
        padding="10px"
        align="center"
      >
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
          label="providerno"
          name="provider_no"
          width="200px"
          value={provider_no}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_CHAIN_PROVIDER_LIST"
          enableNetworkCache
          disabled={!isManagerUser}
          apiParams={{
            account_no: accountNo,
          }}
        />

        <SelectWithApiQuery
          label="tpaname"
          name="root_organization_no"
          width="350px"
          value={root_organization_no}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_TPA_PROVIDER_LIST"
          enableNetworkCache
          skipQuery={!provider_no}
          apiParams={{
            provider_no,
          }}
        />

        <FindPatientForm
          onChangeSearchFields={onChangeSearchFields}
          handleChangeMultipleInputs={handleChangeMultipleInputs}
          hidePhoneOption
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
