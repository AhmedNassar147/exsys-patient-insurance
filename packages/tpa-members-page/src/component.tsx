/*
 *
 * `TpaMembersPage`: `@exsys-patient-insurance/tpa-members-page`.
 *
 */
import { memo, useCallback, useRef } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import Button from "@exsys-patient-insurance/button";
import { SelectWithApiQueryRefValuesType } from "@exsys-patient-insurance/select-with-api-query";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";
import {
  useGlobalProviderNo,
  useCurrentUserType,
} from "@exsys-patient-insurance/app-config-store";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import {
  //RecordTypeWithAnyValue,
  onChangeEvent,
} from "@exsys-patient-insurance/types";
import { initialFormFilterValues, TABLE_COLUMNS } from "./constants";
import { TpaMembersRecordType } from "./index.interface";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import ModalView from "./partials/ModalView";

const TpaMembersPage = () => {
  const globalProviderNo = useGlobalProviderNo();
  const { isManagerUser } = useCurrentUserType();

  const serialNoListRef = useRef<SelectWithApiQueryRefValuesType>();

  const {
    values: {
      currentPatientData: { patient_card_no },
    },

    handleChangeMultipleInputs,
    resetForm,
  } = useFormManager({
    initialValues: {
      ...initialFormFilterValues,
      provider_no: isManagerUser ? "" : globalProviderNo,
    },
  });
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  // const [currentSelectedRow, setCurrentSelectedRow] =
  //   useState<TpaMembersRecordType>();

  //const { policy_no, organization_no } = currentSelectedRow || {};
  const { tableValuesRef, fetchTableData, resetTableData } =
    useCreateTableActionsFromRefToForm<TpaMembersRecordType>();

  const onPressSearch = useCallback(
    () =>
      fetchTableData({
        policy_no: "SSW",
        branch_no: "8",
        class: "SSGL",
        organization_no: "001",
        patient_card_no,
        poffset: 0,
      }),
    [fetchTableData, patient_card_no]
  );

  const handleClear = useCallback(() => {
    resetForm();
    resetTableData();
  }, [resetTableData, resetForm]);

  // const tableSkipQuery = useCallback(
  //   ({ root_organization_no, provider_no }: RecordTypeWithAnyValue) =>
  //     !root_organization_no || !provider_no,
  //   []
  // );

  // const expandedRowRender: TableExpandedRowRenderType<TpaMembersRecordType> =
  //   useCallback(
  //     ({ dtl_data }) => (
  //       <ExsysTable
  //         dataSource={dtl_data}
  //         margin="5px 0"
  //         totalRecordsInDataBase={dtl_data?.length ?? 0}
  //         columns={detailsTableColumns}
  //         rowKey="rowKey"
  //         hideTableHeaderTools
  //       />
  //     ),
  //     []
  //   );

  // const onSelectRow = useCallback(
  //   (currentRecord: TpaMembersRecordType) =>
  //     setCurrentSelectedRow(currentRecord),
  //   []
  // );

  // const reportData = {
  //   P_UCAF_ID: ucaf_id,
  //   P_PROVIDER_NO: provider_number,
  // };

  const onChangeSearchFields: onChangeEvent = useCallback(() => {
    handleChangeMultipleInputs({
      currentPatientData: {
        patient_card_no: "",
      },
    });
    serialNoListRef?.current?.clearOptions();
  }, [handleChangeMultipleInputs, serialNoListRef]);

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
        <FindPatientForm
          onChangeSearchFields={onChangeSearchFields}
          handleChangeMultipleInputs={handleChangeMultipleInputs}
          hidePhoneOption
        />

        <SearchClearIcons
          onPressClear={handleClear}
          onPressSearch={onPressSearch}
        />

        <Button
          label="creatnewrecord"
          type="primary"
          shape="round"
          onClick={handleOpen}
        />
      </Flex>

      <ExsysTableWithApiQuery<TpaMembersRecordType>
        width="100%"
        // @ts-ignore we already know it takes a ref.
        ref={tableValuesRef}
        columns={TABLE_COLUMNS}
        rowKey="patient_card_no"
        queryApiId="QUERY_POLICY_PATIENTS_TABLE_DATA"
        hideTableHeaderTools={false}
        canEdit={false}
        canInsert={false}
        canDelete
        withInfo
        withPdf
        withExcel
        // onSelectRow={onSelectRow}
        // expandedRowRender={expandedRowRender}
        // skipQuery={tableSkipQuery}
        useAlignedTotalCells
      />
      <ModalView visible={visible} handleClose={handleClose} />
    </>
  );
};

export default memo(TpaMembersPage);
