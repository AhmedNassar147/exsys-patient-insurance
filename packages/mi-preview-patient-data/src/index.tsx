/*
 *
 * Package: `@exsys-patient-insurance/mi-preview-patient-data`.
 *
 */
import { memo, useState, useCallback } from "react";
import Flex from "@exsys-patient-insurance/flex";
import Button from "@exsys-patient-insurance/button";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import Image from "@exsys-patient-insurance/image";
import SnippetsIcon from "@exsys-patient-insurance/snippets-icon";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { colors } from "@exsys-patient-insurance/theme-values";
import {
  RecordType,
  QueryResponseValuesType,
} from "@exsys-patient-insurance/types";
import PatientLimitsModal from "./partials/PatientLimitsModal";
import { PatientMaxLimitsType, PatientLimitsType } from "./index.interface";

const { red, appPrimary } = colors;

interface MiPreviewPatientDataProps {
  width?: string;
  height?: string;
  patientCardNo: string;
  patientName: string;
  gender: string;
  age: string;
  patientImgUrl: string;
  phone: string;
  nationalId: string;
  status: string;
  start_date: string;
  end_date: string;
  class?: string;
  plan: string;
  member_of?: string;
  subsidiary: string;
  relationship: string;
  declaration_file_path?: string;
  declaration_req?: string;
  limitsShown?: boolean;
}

const initialState = {
  maxLimits: 0,
  patientLimits: {} as PatientLimitsType,
};

const MiPreviewPatientData = ({
  patientCardNo,
  patientName,
  gender,
  age,
  patientImgUrl,
  phone,
  nationalId,
  status,
  start_date,
  end_date,
  class: patient_class,
  plan,
  member_of,
  subsidiary,
  relationship,
  declaration_file_path,
  declaration_req,
  width,
  height,
  limitsShown,
}: MiPreviewPatientDataProps) => {
  const { visible, handleOpen, handleClose } = useOpenCloseActionsWithState();

  const [patientLimitsData, setLimits] =
    useState<PatientMaxLimitsType>(initialState);

  const shouldRenderDeleteIcon =
    !declaration_file_path && declaration_req === "Y";

  const shouldRenderDeclarationIcon = !!declaration_file_path;

  const openDeclareFile = useCallback(() => {
    if (declaration_file_path) {
      window.open(
        `${declaration_file_path}`,
        "Popup",
        "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
      );
    }
  }, [declaration_file_path]);

  const handleViewLimitsData = useCallback(
    ({ apiValues }: QueryResponseValuesType<RecordType<PatientLimitsType>>) => {
      const data = apiValues.data;
      const { max_benefit, actual_benefit, reserve_benefit } = data || {};

      const maxLimits =
        (max_benefit || 0) - (actual_benefit || 0) - (reserve_benefit || 0);
      setLimits({
        maxLimits,
        patientLimits: data,
      });
      handleOpen();
    },
    [handleOpen]
  );
  const { runQuery, loading } = useBasicQuery({
    apiId: "QUERY_MI_PATIENT_LIMIT_DATA",
    callOnFirstRender: false,
    runQueryWhenLanguageChanged: true,
    onResponse: handleViewLimitsData,
    skipQuery: !patientCardNo,
  });

  const viewPatientLimit = useCallback(() => {
    runQuery({ patient_card_no: patientCardNo });
  }, [patientCardNo, runQuery]);

  return (
    <>
      <Flex gap="10px" width={width} height={height}>
        <Flex
          bordered
          padding="10px"
          gap="10px"
          width="calc(100% - 5px - 110px)"
          wrap="true"
        >
          <LabeledViewLikeInput
            label="bnfcry"
            minWidth="170px"
            width="auto"
            justify="center"
            value={`${patientName || ""} - ${gender || ""} - ${age || ""} - ${
              relationship || ""
            }`}
          />
          <LabeledViewLikeInput
            minWidth="150px"
            width="auto"
            label="bnfcryid"
            value={nationalId}
            justify="center"
          />
          <LabeledViewLikeInput
            label="cardno"
            value={patientCardNo}
            minWidth="150px"
            justify="center"
            width="auto"
          />
          <LabeledViewLikeInput
            label="phn"
            justify="center"
            value={phone}
            minWidth="110px"
            width="auto"
          />
          <LabeledViewLikeInput
            label="plcy"
            minWidth="300px"
            width="auto"
            justify="center"
            value={`${plan || ""} / ${patient_class || ""}`}
          />
          <LabeledViewLikeInput
            label="strtend"
            minWidth="110px"
            width="auto"
            justify="center"
            value={`${start_date || ""} ~ ${end_date || ""}`}
          />
          <LabeledViewLikeInput
            label="mmbrof"
            value={member_of}
            minWidth="190px"
            justify="center"
            width="auto"
          />
          <LabeledViewLikeInput
            label="subsdry"
            value={subsidiary}
            width="220px"
            justify="center"
            ellipsis="true"
          />

          <LabeledViewLikeInput
            label=""
            minWidth="50px"
            width="auto"
            bordered={false}
          >
            <SelectionCheck
              name="status"
              checked={status === "A"}
              label="actve"
            />
          </LabeledViewLikeInput>

          {(shouldRenderDeleteIcon || shouldRenderDeclarationIcon) && (
            <span title="del">
              <SnippetsIcon
                color={shouldRenderDeleteIcon ? red : appPrimary}
                width="2em"
                height="2em"
                onClick={openDeclareFile}
              />
            </span>
          )}

          {limitsShown && (
            <Button
              label="limts"
              type="primary"
              onClick={viewPatientLimit}
              width="150px"
              loading={loading}
              disabled={loading || !patientCardNo}
            />
          )}
        </Flex>

        <Image
          width="sp17"
          height="sp17"
          src={patientImgUrl}
          alt="patient-image"
        />
      </Flex>

      {visible && (
        <PatientLimitsModal
          {...patientLimitsData}
          visible={visible}
          onClose={handleClose}
        />
      )}
    </>
  );
};
MiPreviewPatientData.defaultProps = {
  width: "100%",
  limitsShown: true,
};

export default memo(MiPreviewPatientData);
