/*
 *
 * Package: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { memo } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import Text from "@exsys-patient-insurance/text";
import Flex from "@exsys-patient-insurance/flex";
import Button from "@exsys-patient-insurance/button";
import InputField from "@exsys-patient-insurance/input-field";
import Modal from "@exsys-patient-insurance/modal";
import ExsysTable from "@exsys-patient-insurance/exsys-table";
import {
  onChangeEvent,
  RecordTypeWithAnyValue,
  TableBodyRowClickEvent,
} from "@exsys-patient-insurance/types";
import { TABLE_COLUMNS, SEARCH_RADIO_OPTIONS } from "./constants";

interface FindPatientFormProps {
  searchType?: string;
  searchValue?: string;
  onSearchPatients: () => void;
  handleChange: onChangeEvent;
  patientSearchLoading?: boolean;
  selectionModalOpened?: boolean;
  closeSelectionModal: () => void;
  patientsDataList: RecordTypeWithAnyValue[];
  onDoubleClickPatientRecord?:
    | TableBodyRowClickEvent<RecordTypeWithAnyValue>
    | undefined;
}

const FindPatientForm = ({
  searchType,
  searchValue,
  onSearchPatients,
  handleChange,
  patientSearchLoading,
  selectionModalOpened,
  closeSelectionModal,
  patientsDataList,
  onDoubleClickPatientRecord,
}: FindPatientFormProps) => {
  const searchDisabled = (searchValue?.length || 0) < 3;

  return (
    <>
      <Flex width="auto" padding="10px" bordered gap="10px" align="center">
        <Text margin="0">fndpat</Text>
        <SelectionCheckGroup
          options={SEARCH_RADIO_OPTIONS}
          name="search_type"
          value={searchType}
          onChange={handleChange}
          mode="radio"
          disabled={patientSearchLoading}
        />

        <InputField
          width="200px"
          value={searchValue}
          name="search_value"
          onChange={handleChange}
          onPressEnter={onSearchPatients}
          disabled={patientSearchLoading}
        />

        <Button
          label="srch"
          disabled={searchDisabled}
          onClick={onSearchPatients}
          type="primary"
          loading={patientSearchLoading}
        />
      </Flex>

      {selectionModalOpened && (
        <Modal
          title="slctpat"
          width="1100px"
          visible={selectionModalOpened}
          onClose={closeSelectionModal}
          maskClosable={false}
          noCancelButton
        >
          <ExsysTable
            dataSource={patientsDataList}
            rowKey="rowKey"
            totalRecordsInDataBase={patientsDataList?.[0]?.total?.length ?? 0}
            noPagination
            hideTableHeaderTools
            columns={TABLE_COLUMNS}
            onDoubleClick={onDoubleClickPatientRecord}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(FindPatientForm);
