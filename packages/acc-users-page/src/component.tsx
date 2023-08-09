/*
 *
 * `AccUsers`: `@exsys-patient-insurance/acc-users`.
 *
 */

import { memo, useCallback, useMemo, useState } from "react";
import Flex from "@exsys-patient-insurance/flex";
import { useCurrentAccountNo } from "@exsys-patient-insurance/app-config-store";
import TableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";

import Button from "@exsys-patient-insurance/button";
import { TABLE_COLUMNS } from "./constants";
import { AccUsersTableRecordType } from "./index.interface";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import ModalView from "./partials/ModalView";

const AccUsersPage = () => {
  const globalAccountNo = useCurrentAccountNo();
  const [currentSelectedRow, setCurrentSelectedRow] =
    useState<AccUsersTableRecordType>();

  const { tableValuesRef, fetchTableData } =
    useCreateTableActionsFromRefToForm<AccUsersTableRecordType>();

  const onSelectRow = useCallback(
    (currentRecord: AccUsersTableRecordType) =>
      setCurrentSelectedRow(currentRecord),
    []
  );

  const {
    visible,
    handleClose,
    handleOpen: openModal,
  } = useOpenCloseActionsWithState();

  const baseSearchParams = {
    account_no: globalAccountNo,
  };

  const computedColumns = useMemo(
    () =>
      TABLE_COLUMNS.map((column) => {
        const { dataIndex } = column;
        if (dataIndex.includes("action")) {
          return {
            ...column,
            render: () => {
              return (
                <Button
                  type="primary"
                  label="chngpass"
                  size="small"
                  onClick={openModal}
                />
              );
            },
          };
        }
        return column;
      }),
    [openModal]
  );

  return (
    <>
      <Flex width="100%" align="center" bordered padding="10px" gap="10px">
        <Flex flex={1} align="center" gap="20px" wrap="true">
          <TableWithApiQuery<AccUsersTableRecordType>
            // @ts-ignore we already know it takes a ref.
            ref={tableValuesRef}
            columns={computedColumns}
            rowKey="key"
            queryApiId="QUERY_MI_USERS_ACCOUNTS_TABLE_DATA"
            onSelectRow={onSelectRow}
            useAlignedTotalCells
            hideTableHeaderTools={false}
            canEdit={false}
            canInsert={false}
            canDelete={false}
            withInfo={false}
            withPdf={false}
            withExcel
            callOnFirstRender
            baseQueryAPiParams={baseSearchParams}
          />
          {visible && (
            <ModalView
              visible={visible}
              onClose={handleClose}
              selectedUsersData={currentSelectedRow}
              oldPassword=""
              refreshQueryableTables={fetchTableData}
            ></ModalView>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default memo(AccUsersPage);
