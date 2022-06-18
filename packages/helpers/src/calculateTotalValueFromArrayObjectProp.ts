/*
 *
 * Helper: `calculateTotalValueFromArrayObjectProp`.
 *
 */
import { isArrayHasData } from "./isThereData";
import { RecordType, StringNumber } from "@exsys-patient-insurance/types";

const calculateTotalValueFromArrayObjectProp = <T = RecordType<StringNumber>>(
  valuePropName: string,
  dataArray?: T[]
) => {
  if (!isArrayHasData(dataArray)) {
    return 0;
  }

  return (dataArray?.reduce(
    (acc: number, { [valuePropName as keyof T]: value }) =>
      acc + ((+value || 0) as number),
    0
  ) || 0) as number;
};

export default calculateTotalValueFromArrayObjectProp;
