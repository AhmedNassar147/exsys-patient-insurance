/*
 *
 * `isThereData`: `@exsys-clinio/helpers`.
 *
 */
export const isArrayHasData = <T = Array<any>>(arr: T) =>
  Array.isArray(arr) && !!arr.length;

export const isObjHasData = (obj: object | Record<string, any>) =>
  Boolean(obj) && typeof obj === "object" && !!Object.keys(obj).length;
