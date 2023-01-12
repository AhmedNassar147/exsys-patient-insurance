/*
 *
 * helper: `generateParams`.
 *
 */
import { isObjHasData } from "@exsys-patient-insurance/helpers";
import { RecordType, StringNumber } from "@exsys-patient-insurance/types";

const generateParams = (obj: RecordType<StringNumber>) => {
  let paramString = [];

  if (isObjHasData(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      if (obj.hasOwnProperty(key)) {
        paramString.push(key + "=" + value);
      }
    }
  }

  return paramString.join("+");
};

export default generateParams;
