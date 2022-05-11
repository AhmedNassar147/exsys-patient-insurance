/*
 *
 * `createApiResource` : `@exsys-clinio/refetch`.
 *
 */
import { isObjHasData } from "@exsys-clinio/helpers";

const CHARACTERS_BACKEND_CAN_NOT_DECODE = ["+", "%"];

const createApiResource = (source: string, params: object): string => {
  if (isObjHasData(params)) {
    source += "?";
    Object.keys(params).forEach((item, idx) => {
      // @ts-ignore
      let paramValue = params[item];

      if (!!paramValue) {
        paramValue = `${paramValue}`;

        for (const entry of CHARACTERS_BACKEND_CAN_NOT_DECODE) {
          const regexpPatternString = `\\${entry}`;

          const entryRegexp = new RegExp(regexpPatternString);
          const allEntryRegexp = new RegExp(regexpPatternString, "g");

          if (entryRegexp.test(paramValue)) {
            paramValue = paramValue.replace(
              allEntryRegexp,
              encodeURIComponent(entry)
            );
          }
        }
      }

      const newParam = `${item}=${paramValue}`;
      if (idx) {
        source += "&";
      }

      return (source += newParam);
    });
  }

  return source;
};

export default createApiResource;
