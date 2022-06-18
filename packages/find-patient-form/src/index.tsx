/*
 *
 * Package: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { memo } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import Flex from "@exsys-patient-insurance/flex";
import Text from "@exsys-patient-insurance/text";
import useFormManager from "@exsys-patient-insurance/form-manager";
import InputField from "@exsys-patient-insurance/input-field";
import { initialValues, SEARCH_RADIO_OPTIONS } from "./constants";

const FindPatientForm = () => {
  const { values, handleChange } = useFormManager({
    initialValues,
  });

  const { search_type, search_value } = values;

  return (
    <>
      <Flex width="100%" gap="10px" bordered padding="10px 12px" align="center">
        <Text margin="0">fndpat</Text>
        <SelectionCheckGroup
          options={SEARCH_RADIO_OPTIONS}
          name="search_type"
          value={search_type}
          onChange={handleChange}
          mode="radio"
        />

        <InputField
          width="200px"
          value={search_value}
          name={search_value}
          onChange={handleChange}
        />
      </Flex>

      <Flex
        width="100%"
        gap="10px"
        bordered
        padding="10px 12px"
        margin="12px 0 0"
      >
        <Flex wrap="true" width="80%" gap="10px">
          <InputField label="bnfcryid" disabled name="name" width="30%" />
          <InputField label="bnfcry" disabled name="name" width="30%" />
          <InputField label="phn" disabled name="name" width="30%" />
          <InputField label="pln" disabled name="name" width="30%" />
          <InputField label="cardno" disabled name="name" width="30%" />
          <InputField label="strtend" disabled name="name" width="30%" />
          <InputField label="class" disabled name="name" width="30%" />
          <InputField label="rltnship" disabled name="name" width="30%" />
          <SelectionCheck width="30%" label="stts" disabled />
          <InputField label="membrof" disabled name="name" width="30%" />
          <InputField label="subsdry" disabled name="name" width="30%" />
        </Flex>
      </Flex>
    </>
  );
};

export default memo(FindPatientForm);
