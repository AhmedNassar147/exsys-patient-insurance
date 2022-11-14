/*
 *
 * Package: `@exsys-patient-insurance/diagnosis-modal`.
 *
 */
import { memo, useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Modal from "@exsys-patient-insurance/modal";
import Flex from "@exsys-patient-insurance/flex";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import InputField from "@exsys-patient-insurance/input-field";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import LabelsProvider from "@exsys-patient-insurance/labels-provider";
import Button from "@exsys-patient-insurance/button";
import {
  RecordType,
  OnResponseActionType,
  onChangeEvent,
} from "@exsys-patient-insurance/types";
import { initialState, RADIO_OPTIONS } from "./constants";
import {
  DiagnosisModalProps,
  ResponseType,
  DiagnosisItemType,
} from "./index.interface";

const DiagnosisModal = ({
  visible,
  onClose,
  departmentId,
  onSelectDiagnosis,
}: DiagnosisModalProps) => {
  const { values, handleChange, handleChangeMultipleInputs } = useFormManager({
    initialValues: initialState,
  });

  const { search_type, search_value, data } = values;
  const isFavoriteSearch = search_type === "F";

  const skipQuery = useCallback(
    ({ department_id, search_type, search_word }: RecordType) => {
      return (
        !department_id ||
        (search_type === "W" && (search_word || "").length < 3)
      );
    },
    []
  );

  const handleDiagnosisResponse: OnResponseActionType<ResponseType> =
    useCallback(
      ({ apiValues, error }) => {
        const apiData = apiValues?.data;
        const foundData = error || !apiData?.length ? [] : apiData;

        handleChange({
          name: "data",
          value: foundData,
        });
      },
      [handleChange]
    );

  const { loading, runQuery } = useBasicQuery<ResponseType>({
    apiId: "QUERY_MI_DIAGNOSIS_DATA",
    disableParamsChangeCheck: true,
    skipQuery,
    callOnFirstRender: visible && !!departmentId && isFavoriteSearch,
    onResponse: handleDiagnosisResponse,
    debounceRequestTimeOutMS: 1800,
    params: {
      department_id: departmentId,
      search_type,
      search_word: isFavoriteSearch ? "" : search_value,
    },
  });

  const onClickSearch = useCallback(() => runQuery(), [runQuery]);

  const onSelectItem = useCallback(
    (item: DiagnosisItemType) => () => {
      onSelectDiagnosis?.(item);
      onClose();
    },
    [onSelectDiagnosis, onClose]
  );

  const handleChangeSearchType: onChangeEvent = useCallback(
    ({ name, value }) => {
      handleChangeMultipleInputs({
        [name]: value,
        data: [],
      });

      if (value === "F") {
        runQuery({ search_word: "" });
      }
    },
    [handleChangeMultipleInputs, runQuery]
  );

  const searchButtonDisabled =
    !isFavoriteSearch && (search_value || "").length < 3;

  return (
    <Modal
      title="slctdiag"
      onClose={onClose}
      visible={visible}
      width="1000px"
      noCancelButton
      maskClosable={false}
      bodyMinHeight="100px"
      bodyMaxHeight="calc(100vh - 210px)"
    >
      <Flex width="100%" align="center" margin="0 0 12px" gap="12px">
        <SelectionCheckGroup
          onChange={handleChangeSearchType}
          value={search_type}
          name="search_type"
          options={RADIO_OPTIONS}
          mode="radio"
        />

        <InputField
          disabled={isFavoriteSearch}
          name="search_value"
          value={search_value}
          onChange={handleChange}
          label="alwserchbywrd"
          width="300px"
          onClick={onClickSearch}
        />

        <Button
          label="srch"
          type="primary"
          onClick={onClickSearch}
          disabled={searchButtonDisabled}
        />
      </Flex>
      <Flex width="100%" wrap="true" gap="10px">
        {!!data?.length && !loading
          ? data.map((item) => {
              const { diage_name, diag_code } = item;

              return (
                <Flex
                  bordered
                  ellipsis="true"
                  key={diag_code}
                  width="calc(100% / 2 - 5px)"
                  lineheight="28px"
                  padding="0 6px"
                  onClick={onSelectItem(item)}
                  cursor="pointer"
                >
                  {diage_name}
                </Flex>
              );
            })
          : null}
      </Flex>
    </Modal>
  );
};

const MemoizedDiagnosisModal = memo(DiagnosisModal);

export default memo((props: DiagnosisModalProps) => (
  <LabelsProvider componentName="diagnosisModal">
    <MemoizedDiagnosisModal {...props} />
  </LabelsProvider>
));

export type { OnSelectDiagnosisType } from "./index.interface";
