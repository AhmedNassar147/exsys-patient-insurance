/*
 *
 * `UsersListPage`: `@exsys-patient-insurance/users-list-page`.
 *
 */
import { memo, useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import InputField from "@exsys-patient-insurance/input-field";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import {
  useCurrentPagePrivileges,
  useOpenCloseActionsWithState,
} from "@exsys-patient-insurance/hooks";
import { TableBodyRowClickEvent } from "@exsys-patient-insurance/types";
import CreateOrEditUserModal from "./partials/CreateOrEditUserModal";
import { initialFormFilterValues, TABLE_COLUMNS } from "./constants";
import { UserRecordType } from "./index.interface";

const UsersListPage = () => {
  const { f_insert, f_update } = useCurrentPagePrivileges({
    useFullPathName: true,
  });

  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const {
    values: { provider_no, mobile_no, job_id, selectedUser },
    handleChange,
    resetForm,
  } = useFormManager({
    initialValues: initialFormFilterValues,
  });

  const { tableValuesRef, fetchTableData, setTableData } =
    useCreateTableActionsFromRefToForm<UserRecordType>();

  const onPressSearch = useCallback(
    () =>
      fetchTableData({
        provider_no,
        mobile_no,
        job_id,
      }),
    [provider_no, mobile_no, job_id, fetchTableData]
  );

  const handleClear = useCallback(() => {
    resetForm();
    setTableData([]);
  }, [setTableData, resetForm]);

  const onSelectRow: TableBodyRowClickEvent<UserRecordType> = useCallback(
    (currentRecord) =>
      handleChange({
        name: "selectedUser",
        value: currentRecord,
      }),
    [handleChange]
  );

  const setRecordStatus = useCallback(
    (recordStatus: string) => () => {
      handleChange({
        name: "selectedUser.record_status",
        value: recordStatus,
      });
      handleOpen();
    },
    [handleChange, handleOpen]
  );

  const onAfterSave = useCallback(() => {
    handleClose();
    handleChange({
      name: "selectedUser",
      value: initialFormFilterValues.selectedUser,
    });
    fetchTableData();
  }, [handleChange, handleClose, fetchTableData]);

  const canInsert = f_insert !== "N";
  const canEdit = f_update !== "N";

  return (
    <>
      <Flex width="100%" gap="10px" wrap="true" bordered padding="10px">
        <SelectWithApiQuery
          label="providername"
          name="provider_no"
          width="350px"
          value={provider_no}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_PROVIDER_NAMES_LIST"
          enableNetworkCache
        />

        <SelectWithApiQuery
          label="jobdesc"
          name="job_id"
          width="300px"
          value={job_id}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_JOB_ID_LIST"
          enableNetworkCache
        />

        <InputField
          name="mobile_no"
          value={mobile_no}
          onChange={handleChange}
          width="160px"
          label="phn"
        />

        <SearchClearIcons
          onPressClear={handleClear}
          onPressSearch={onPressSearch}
        />
      </Flex>

      <ExsysTableWithApiQuery<UserRecordType>
        width="100%"
        // @ts-ignore we already know it takes a ref.
        ref={tableValuesRef}
        columns={TABLE_COLUMNS}
        rowKey="rowKey"
        queryApiId="QUERY_TPA_USERS_TABLE_DATA"
        hideTableHeaderTools={false}
        canEdit={canEdit}
        canInsert={canInsert}
        canDelete={false}
        withInfo={false}
        withPdf={false}
        onSelectRow={onSelectRow}
        onPressAdd={setRecordStatus("n")}
        onPressSaveOrEdit={setRecordStatus("u")}
      />

      {visible && (
        <CreateOrEditUserModal
          visible={visible}
          onClose={handleClose}
          selectedUser={selectedUser}
          onAfterSave={onAfterSave}
          selectedProviderNo={provider_no}
        />
      )}
    </>
  );
};

export default memo(UsersListPage);
