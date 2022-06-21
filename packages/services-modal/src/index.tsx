/*
 *
 * Package: `@exsys-patient-insurance/services-modal`.
 *
 */
import { memo, useCallback } from "react";
import Modal from "@exsys-patient-insurance/modal";
import InputField from "@exsys-patient-insurance/input-field";
import Flex from "@exsys-patient-insurance/flex";
import useFormManager from "@exsys-patient-insurance/form-manager";
import { useGlobalProviderNo } from "@exsys-patient-insurance/app-config-store";
import TableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import {
  RecordType,
  TableBodyRowClickEvent,
} from "@exsys-patient-insurance/types";
import { ServicesModalProps, ServiceRequestItemType } from "./index.interface";
import { initialState, TABLE_COLUMNS } from "./constants";

const ServicesModal = ({
  onClose,
  visible,
  searchParams,
  onSelectService,
}: ServicesModalProps) => {
  const { values, handleChange } = useFormManager({
    initialValues: initialState,
  });
  const providerNo = useGlobalProviderNo();

  const { tableValuesRef, fetchTableData } =
    useCreateTableActionsFromRefToForm<ServiceRequestItemType>();

  const { search_word } = values;

  const onSearch = useCallback(() => {
    if (search_word?.length > 3) {
      fetchTableData({
        search_word,
      });
    }
  }, [search_word, fetchTableData]);

  const skipQuery = useCallback(
    ({ search_word }: RecordType) => (search_word || "")?.length < 3,
    []
  );

  const onDoubleClickRecord: TableBodyRowClickEvent<ServiceRequestItemType> =
    useCallback(
      (record) => {
        onSelectService(record);
        onClose();
      },
      [onSelectService, onClose]
    );

  const baseSearchParams = {
    ...searchParams,
    provider_no: providerNo,
  };

  return (
    <Modal
      title="selctservcs"
      onClose={onClose}
      visible={visible}
      width="800px"
      noCancelButton
      maskClosable={false}
    >
      <Flex width="100%" align="center" margin="0 0 12px" justify="center">
        <InputField
          name="search_word"
          value={search_word}
          onChange={handleChange}
          label="prodctnam"
          width="300px"
          onClick={onSearch}
        />
      </Flex>

      <TableWithApiQuery<ServiceRequestItemType>
        // @ts-ignore ignore this for now.
        ref={tableValuesRef}
        queryApiId="QUERY_SERVICES_REQUESTS_DATA"
        rowKey="service_id"
        columns={TABLE_COLUMNS}
        baseQueryAPiParams={baseSearchParams}
        margin="0"
        skipQuery={skipQuery}
        onDoubleClick={onDoubleClickRecord}
      />
    </Modal>
  );
};

export default memo(ServicesModal);
export type { OnSelectServiceType } from "./index.interface";
export type { ServiceRequestItemType };
