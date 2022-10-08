/*
 *
 * Component: `PatientLimitsModal`.
 *
 */
import { memo } from "react";
import Modal from "@exsys-patient-insurance/modal";
import Flex from "@exsys-patient-insurance/flex";
import Text from "@exsys-patient-insurance/text";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import LimitsRow from "./LimitsRow";
import { mainGap, itemWidth, additionalFieldWidth } from "../constants";
import { PatientMaxLimitsType } from "../index.interface";

interface PatientLimitsModalProps extends PatientMaxLimitsType {
  visible: boolean;
  onClose: () => void;
}

const PatientLimitsModal = ({
  visible,
  onClose,
  maxLimits,
  patientLimits,
}: PatientLimitsModalProps) => {
  const {
    max_benefit,
    actual_benefit,
    reserve_benefit,
    max_opd,
    actual_opd,
    reserve_opd,
    actual_adt,
    reserve_adt,
    max_adt,
    reserve_chronic,
    actual_chronic,
    max_chronic,
    reserve_pre_exist,
    actual_pre_exist,
    max_pre_exist,
    reserve_family,
    actual_family,
    max_family,
    addition_approvals,
    max_per_day,
    max_room_cost,
    max_opd_patient_copay,
  } = patientLimits || {};

  return (
    <Modal
      title="limts"
      visible={visible}
      width="47%"
      onClose={onClose}
      noFooter
    >
      <Flex column="true" width="100%" gap={mainGap}>
        <Flex align="center" width="100%" gap={mainGap}>
          <Text
            margin="0"
            padding="0"
            align="-webkit-auto"
            disableTranslation
            width={itemWidth}
          />
          <Text
            margin="0"
            padding="0"
            align="-webkit-auto"
            children="cntct"
            width={itemWidth}
          />
          <Text
            margin="0"
            padding="0"
            align="-webkit-auto"
            children="usd"
            width={itemWidth}
          />
          <Text
            margin="0"
            padding="0"
            align="-webkit-auto"
            children="resrv"
            width={itemWidth}
          />
          <Text
            margin="0"
            padding="0"
            align="-webkit-auto"
            children="remian"
            width={itemWidth}
          />
        </Flex>
        <LimitsRow
          title="maxbnfts"
          max={max_benefit}
          actual={actual_benefit}
          reserve={reserve_benefit}
          maxBenefit={maxLimits}
        />
        <LimitsRow
          title="maxopd"
          max={max_opd}
          actual={actual_opd}
          reserve={reserve_opd}
          maxBenefit={maxLimits}
        />
        <LimitsRow
          title="maxadt"
          max={max_adt}
          actual={actual_adt}
          reserve={reserve_adt}
          maxBenefit={maxLimits}
        />
        <LimitsRow
          title="maxchrnc"
          max={max_chronic}
          actual={actual_chronic}
          reserve={reserve_chronic}
          maxBenefit={maxLimits}
        />
        <LimitsRow
          title="maxpreexist"
          max={max_pre_exist}
          actual={actual_pre_exist}
          reserve={reserve_pre_exist}
          maxBenefit={maxLimits}
        />
        <LimitsRow
          title="maxfam"
          max={max_family}
          actual={actual_family}
          reserve={reserve_family}
          maxBenefit={maxLimits}
        />

        <Flex width="100%" gap={mainGap} wrap="true">
          <LabeledViewLikeInput
            label="aditnalaprvls"
            width={additionalFieldWidth}
            value={addition_approvals}
            justify="center"
          />
          <LabeledViewLikeInput
            label="maxperday"
            width={additionalFieldWidth}
            value={max_per_day}
            justify="center"
          />
          <LabeledViewLikeInput
            label="maxromcost"
            width={additionalFieldWidth}
            value={max_room_cost}
            justify="center"
          />
          <LabeledViewLikeInput
            label="maxopdpatcopay"
            width={additionalFieldWidth}
            value={max_opd_patient_copay}
            justify="center"
          />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default memo(PatientLimitsModal);
