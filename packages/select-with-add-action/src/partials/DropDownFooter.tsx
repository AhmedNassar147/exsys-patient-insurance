/*
 *
 * Component: `DropDownFooter`.
 *
 */
import { memo, useCallback } from "react";
import InputField from "@exsys-patient-insurance/input-field";
import Flex from "@exsys-patient-insurance/flex";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Button from "@exsys-patient-insurance/button";
import { INITIAL_FORM_STATE, FORM_KEYS_NAMES } from "../constants";
import { DropDownFooterProps } from "../index.interface";

const { AR_INPUT, EN_INPUT } = FORM_KEYS_NAMES;

const DropDownFooter = ({ oneInput, onSaveItem }: DropDownFooterProps) => {
  const isRightToLeft = useMakeSelectIsRTLLayout();

  const { values, handleChange, resetForm } = useFormManager({
    initialValues: INITIAL_FORM_STATE,
  });

  const { [AR_INPUT]: arValue, [EN_INPUT]: enValue } = values;

  const showEnInput = !oneInput || (oneInput && !isRightToLeft);
  const showArInput = !oneInput || (oneInput && isRightToLeft);

  const arInputRequired = showArInput && !arValue?.length;
  const enInputRequired = showEnInput && !enValue?.length;

  const handleSaveForm = useCallback(() => {
    onSaveItem({
      description_p: enValue,
      description_s: arValue,
    });
    resetForm();
  }, [onSaveItem, resetForm, enValue, arValue]);

  return (
    <>
      <Flex column="true" width="100%" gap="4px" padding="4px">
        {showEnInput && (
          <InputField
            placeholder="Add new item"
            name={EN_INPUT}
            value={enValue}
            onChange={handleChange}
          />
        )}
        {showArInput && (
          <InputField
            placeholder="اضافة عنصر جديد"
            dir="rtl"
            name={AR_INPUT}
            value={arValue}
            onChange={handleChange}
          />
        )}
        <Button
          label="save"
          block
          type="primary"
          onClick={handleSaveForm}
          disabled={arInputRequired || enInputRequired}
        />
      </Flex>
    </>
  );
};

export default memo(DropDownFooter);
