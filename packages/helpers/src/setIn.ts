/*
 *
 * `setIn`: `@exsys-clinio/helpers`.
 *
 */
import { RecordTypeWithAnyValue } from "@exsys-clinio/types";
import castToPath, { Path_Type } from "./castToPath";

type Source_Type = RecordTypeWithAnyValue | (string | number)[];

const setIn = <T = Source_Type>(
  path: Path_Type,
  valueToSet: any,
  source: T,
  separator?: string
) => {
  // we take another ref so we don't mutate the original source
  const target: T = JSON.parse(JSON.stringify(source || {}));
  const keys = castToPath(path, separator);
  let mostNestedObj: Source_Type = target;
  let keyIndex = 0;
  const keysLength = keys.length;

  /* set remaining keys */
  while (keyIndex < keysLength) {
    const key = keys[keyIndex];
    const isLastKey = keyIndex === keysLength - 1;

    if (isLastKey) {
      // @ts-ignore
      mostNestedObj[key] = valueToSet;
    } else {
      // @ts-ignore
      if (!mostNestedObj[key]) {
        // @ts-ignore
        mostNestedObj[key] = {};
      }
      // @ts-ignore
      mostNestedObj = mostNestedObj[key];
    }

    keyIndex++;
  }

  return target as T;
};

export default setIn;
