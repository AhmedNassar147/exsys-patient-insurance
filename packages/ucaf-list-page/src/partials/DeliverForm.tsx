/*
 *
 * Component: `DeliverForm`.
 *
 */
import { memo, useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import Flex from "@exsys-patient-insurance/flex";
import Button from "@exsys-patient-insurance/button";
import {
  checkIfThisDateGreaterThanOther,
  validateFields,
} from "@exsys-patient-insurance/helpers";
import {
  CapitalBooleanStringType,
  onChangeEvent,
} from "@exsys-patient-insurance/types";
import useDeliverRequest from "../hooks/useDeliverRequest";
import { initialDeliveryFormState } from "../constants";
import { RequestTableRecordType } from "../index.interface";

interface DeliverFormProps {
  isInPatientUcafType: boolean;
  onSearchRequests: () => void;
  rootOrganizationNo: string;
  ucafId?: number;
  foundPatientCardNo: string;
  paperSerial: string;
  isChronic?: CapitalBooleanStringType;
  ucafeDate?: string;
  dispenseItemsRows: RequestTableRecordType[];
}

const { discharge_date: initialDischargeDate } = initialDeliveryFormState;

const DeliverForm = ({
  isInPatientUcafType,
  rootOrganizationNo,
  ucafId,
  foundPatientCardNo,
  paperSerial,
  isChronic,
  ucafeDate,
  onSearchRequests,
  dispenseItemsRows,
}: DeliverFormProps) => {
  const {
    handleChange,
    handleChangeMultipleInputs,
    values: { admission_date, discharge_date },
    setErrors,
    errors,
  } = useFormManager({
    initialValues: initialDeliveryFormState,
  });

  const { handleDeliverItem, loading: isDeliveringItem } = useDeliverRequest({
    root_organization_no: rootOrganizationNo,
    ucaf_id: ucafId,
    patient_card_no: foundPatientCardNo,
    paper_serial: paperSerial,
    is_chronic: isChronic,
    ucafe_date: ucafeDate,
    onSuccess: onSearchRequests,
  });

  const handleChangeStartDate: onChangeEvent = useCallback(
    ({ name, value }) =>
      handleChangeMultipleInputs({
        [name]: value,
        ...(value && checkIfThisDateGreaterThanOther(value, discharge_date)
          ? {
              discharge_date: initialDischargeDate,
            }
          : null),
      }),
    [handleChangeMultipleInputs]
  );

  const onSaveRequestedProductsToDelivery = useCallback(() => {
    const errors = isInPatientUcafType
      ? validateFields({ admission_date, discharge_date })
      : undefined;

    setErrors(errors as typeof initialDeliveryFormState);

    if (errors) {
      return;
    }

    if (dispenseItemsRows?.length) {
      handleDeliverItem(
        dispenseItemsRows,
        isInPatientUcafType ? admission_date : undefined,
        isInPatientUcafType ? discharge_date : undefined
      );
    }
  }, [handleDeliverItem, dispenseItemsRows, admission_date, discharge_date]);

  const submitButton = (
    <Button
      type="primary"
      loading={isDeliveringItem}
      disabled={isDeliveringItem}
      onClick={onSaveRequestedProductsToDelivery}
      label={isInPatientUcafType ? "dschrge" : "dlvr"}
    />
  );

  return isInPatientUcafType ? (
    <Flex gap="10px" width="28%" padding="4px" bordered align="center">
      <DatePickerField
        width="40%"
        onChange={handleChangeStartDate}
        name="admission_date"
        label="admtiondate"
        value={admission_date}
        max={initialDischargeDate}
        error={errors?.admission_date}
      />
      <DatePickerField
        width="40%"
        onChange={handleChange}
        name="discharge_date"
        label="dischdate"
        value={discharge_date}
        min={admission_date}
        max={initialDischargeDate}
        error={errors?.discharge_date}
      />

      {submitButton}
    </Flex>
  ) : (
    submitButton
  );
};

export default memo(DeliverForm);
