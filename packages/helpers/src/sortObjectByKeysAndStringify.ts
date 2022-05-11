/*
 *
 * `sortObjectByKeysAndStringify`: `@exsys-clinio/helpers`.
 *
 */
import { RecordTypeWithAnyValue } from "@exsys-clinio/types";

const sortObjectByKeysAndStringify = (params?: RecordTypeWithAnyValue) => {
  let result = {};

  if (params) {
    const keys = Object.keys(params);

    if (keys.length) {
      result = keys.sort().reduce(
        (acc: RecordTypeWithAnyValue, key: string) => ({
          ...acc,
          [key]: params[key],
        }),
        {}
      );
    }
  }

  return JSON.stringify(result);
};

export default sortObjectByKeysAndStringify;
