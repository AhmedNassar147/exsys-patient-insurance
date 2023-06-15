/*
 *
 * `SalesDetailsPage`: `@exsys-patient-insurance/sales-details-page`.
 *
 */
import { memo, useCallback, useMemo, useRef } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import SelectWithApiQuery, {
  SelectWithApiQueryRefValuesType,
} from "@exsys-patient-insurance/select-with-api-query";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";
import {
  useGlobalProviderNo,
  useCurrentUserType,
  useCurrentAccountNo,
} from "@exsys-patient-insurance/app-config-store";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import ExsysTable from "@exsys-patient-insurance/exsys-table";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import {
  //RecordTypeWithAnyValue,
  onChangeEvent,
  TableExpandedRowRenderType,
} from "@exsys-patient-insurance/types";
import {
  initialFormFilterValues,
  TABLE_COLUMNS,
  PROVIDER_NAME_COLUMN,
  detailsTableColumns,
} from "./constants";
import { SalesDetailsRecordType } from "./index.interface";

const SalesDetailsPage = () => {
  const globalProviderNo = useGlobalProviderNo();
  const { isManagerUser } = useCurrentUserType();
  const accountNo = useCurrentAccountNo();
  const serialNoListRef = useRef<SelectWithApiQueryRefValuesType>();

  const {
    values: {
      date_from,
      date_to,
      root_organization_no,
      provider_no,
      paper_serial,
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
        provider_account_no: accountNo,
        paper_serial,
      }),
    [
      date_from,
      date_to,
      root_organization_no,
      fetchTableData,
      provider_no,
      patient_card_no,
      accountNo,
      paper_serial,
    ]
  );

  const handleClear = useCallback(() => {
    resetForm();
    setTableData([]);
  }, [setTableData, resetForm]);

  // const tableSkipQuery = useCallback(
  //   ({ root_organization_no, provider_no }: RecordTypeWithAnyValue) =>
  //     !root_organization_no || !provider_no,
  //   []
  // );

  const expandedRowRender: TableExpandedRowRenderType<SalesDetailsRecordType> =
    useCallback(
      ({ dtl_data }) => (
        <ExsysTable
          dataSource={dtl_data}
          margin="5px 0"
          totalRecordsInDataBase={dtl_data?.length ?? 0}
          columns={detailsTableColumns}
          rowKey="rowKey"
          hideTableHeaderTools
        />
      ),
      []
    );

  const onChangeSearchFields: onChangeEvent = useCallback(() => {
    handleChangeMultipleInputs({
      currentPatientData: {
        patient_card_no: "",
      },
    });
    serialNoListRef?.current?.clearOptions();
  }, [handleChangeMultipleInputs, serialNoListRef]);

  const tableColumns = useMemo(() => {
    const [firstColumn, secondColumn, ...restColumns] = TABLE_COLUMNS;
    return [
      ...(isManagerUser ? PROVIDER_NAME_COLUMN : []),
      firstColumn,
      {
        ...secondColumn,
        width: !isManagerUser ? "18%" : "9%",
      },
      ...restColumns,
    ];
  }, [isManagerUser]);

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
          label="tpaname"
          name="root_organization_no"
          width="200px"
          value={root_organization_no}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_TPA_PROVIDER_LIST"
          enableNetworkCache
          //skipQuery={!provider_no}
          // apiParams={{
          //   provider_no,
          // }}
        />

        <SelectWithApiQuery
          label="providerno"
          name="provider_no"
          width="230px"
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

        <FindPatientForm
          onChangeSearchFields={onChangeSearchFields}
          handleChangeMultipleInputs={handleChangeMultipleInputs}
          hidePhoneOption
        />

        <SelectWithApiQuery
          ref={serialNoListRef}
          queryType="query"
          apiOrCodeId="QUERY_PATIENT_PROVIDER_SERIALS_LIST"
          width="120px"
          value={paper_serial}
          name="paper_serial"
          label="serial"
          onChange={handleChange}
          checkAllParamsValuesToQuery
          apiParams={{
            patient_card_no,
            provider_no,
            date_from,
            date_to,
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
        columns={tableColumns}
        rowKey="rowKey"
        queryApiId="QUERY_SALE_DETAILS_TABLE_DATA"
        hideTableHeaderTools={false}
        canEdit={false}
        canInsert={false}
        canDelete={false}
        withInfo={false}
        withPdf={false}
        withExcel
        expandedRowRender={expandedRowRender}
        // skipQuery={tableSkipQuery}
        useAlignedTotalCells
      />
    </>
  );
};

export default memo(SalesDetailsPage);
