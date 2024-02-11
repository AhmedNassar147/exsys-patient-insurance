/*
 *
 * `SalesDetailsPage`: `@exsys-patient-insurance/sales-details-page`.
 *
 */
import { memo, useCallback, useMemo, useRef, useState } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import SelectWithApiQuery, {
  SelectWithApiQueryRefValuesType,
} from "@exsys-patient-insurance/select-with-api-query";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import {
  useGlobalProviderNo,
  useCurrentUserType,
  useCurrentAccountNo,
  useAppConfigStore,
} from "@exsys-patient-insurance/app-config-store";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import ExsysTable from "@exsys-patient-insurance/exsys-table";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import {
  onChangeEvent,
  OnTableCellInputChange,
  TableColumnProps,
  TableExpandedRowRenderType,
} from "@exsys-patient-insurance/types";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import {
  initialFormFilterValues,
  TABLE_COLUMNS,
  PROVIDER_NAME_COLUMN,
  detailsTableColumns,
  PENDING_TYPES_RADIO_OPTIONS,
} from "./constants";
import { PdfDocumentModal } from "@exsys-patient-insurance/document-modal";
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
      pending_flag,
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

  const [currentSelectedRow, setCurrentSelectedRow] =
    useState<SalesDetailsRecordType>();

  const { ucaf_id, provider_number } = currentSelectedRow || {};
  const {
    tableValuesRef,
    fetchTableData,
    resetTableData,
    getCurrentDataSource,
    setTableData,
  } = useCreateTableActionsFromRefToForm<SalesDetailsRecordType>();

  const onPressSearch = useCallback(
    () =>
      fetchTableData({
        provider_no,
        date_from,
        date_to,
        pending_flag,
        root_organization_no,
        patient_card_no,
        provider_account_no: accountNo,
        paper_serial,
        poffset: 0,
      }),
    [
      fetchTableData,
      provider_no,
      date_from,
      date_to,
      pending_flag,
      root_organization_no,
      patient_card_no,
      accountNo,
      paper_serial,
    ]
  );

  const handleClear = useCallback(() => {
    resetForm();
    resetTableData();
  }, [resetTableData, resetForm]);

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

  const onSelectRow = useCallback(
    (currentRecord: SalesDetailsRecordType) =>
      setCurrentSelectedRow(currentRecord),
    []
  );

  const reportData = {
    P_UCAF_ID: ucaf_id,
    P_PROVIDER_NO: provider_number,
  };

  const onChangeSearchFields: onChangeEvent = useCallback(() => {
    handleChangeMultipleInputs({
      currentPatientData: {
        patient_card_no: "",
      },
    });
    serialNoListRef?.current?.clearOptions();
  }, [handleChangeMultipleInputs, serialNoListRef]);

  const tableColumns = useMemo(() => {
    const [firstColumn, secondColumn, third_column, lastColumn] = TABLE_COLUMNS;
    return [
      ...(isManagerUser ? PROVIDER_NAME_COLUMN : []),
      firstColumn,
      {
        ...secondColumn,
        width: !isManagerUser ? "18%" : "9%",
      },
      {
        ...third_column,
        title: "card_no",
        dataIndex: "card_no",
        width: "7%",
        totalCellProps: {
          isFragment: true,
        },
      },

      {
        title: "patientname",
        dataIndex: "patient_name",
        width: "16.5%",
        totalCellProps: {
          isFragment: true,
        },
      },
      {
        title: "form_no",
        dataIndex: "form_no",
        width: "5%",
        totalCellProps: {
          isFragment: true,
        },
      },
      {
        title: "ucaf_id",
        dataIndex: "ucaf_id",
        width: "5%",
        totalCellProps: {
          isFragment: true,
        },
      },

      {
        title: "gross_price",
        dataIndex: "gross_price",
        width: "7%",
      },
      {
        title: "disc",
        dataIndex: "disc",
        width: "6%",
      },
      {
        title: "copay",
        dataIndex: "copay",
        width: "6%",
      },

      {
        title: "cmpnyshre",
        dataIndex: "provider_share",
        width: "7%",
        ellipsis: true,
      },
      {
        title: "pndng",
        dataIndex: "pending_flag",
        width: "5%",
        totalCellProps: {
          isFragment: true,
        },
        inputProps: {
          inputType: "checkbox",
        },
      },
      {
        ...lastColumn,

        title: "action",
        dataIndex: "specialty_type",
        width: "5%",
        render: () => (
          <PdfDocumentModal
            usePrintIcon
            documentName="MIUCAF"
            reportData={reportData}
          />
        ),
      },
    ] as TableColumnProps[];
  }, [isManagerUser, reportData]);

  const { addNotification } = useAppConfigStore();

  const { mutate } = useBasicMutation({
    apiId: "POST_SERVICES_REQUESTS_ITEM",
  });

  const onInputChange: OnTableCellInputChange = useCallback(
    ({ value, rowIndex }) => {
      const { ucaf_id } = getCurrentDataSource()[rowIndex];
      const updatedDataSource = getCurrentDataSource().map((row, index) =>
        index === rowIndex ? { ...row, pending_flag: value } : row
      );

      setTableData(updatedDataSource);

      mutate({
        body: { pending_flag: value, ucaf_id },
        cb: ({ apiValues }) => {
          const type = apiValues?.status !== "success" ? "error" : "success";
          addNotification({
            type,
            message: type === "error" ? "flssve" : "succmsg",
          });
        },
      });
    },
    [addNotification, getCurrentDataSource, mutate, setTableData]
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
          label="tpaname"
          name="root_organization_no"
          width="200px"
          value={root_organization_no}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_TPA_PROVIDER_LIST"
          enableNetworkCache
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

        <SelectionCheckGroup
          options={PENDING_TYPES_RADIO_OPTIONS}
          onChange={handleChange}
          mode="radio"
          width="auto"
          value={pending_flag}
          name="pending_flag"
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
        onSelectRow={onSelectRow}
        expandedRowRender={expandedRowRender}
        showEditableInputs
        onInputChange={onInputChange}
        useAlignedTotalCells
      />
    </>
  );
};

export default memo(SalesDetailsPage);
