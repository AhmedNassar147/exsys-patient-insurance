/*
 *
 * `castToPath`: `@exsys-clinio/helpers`.
 *
 */
export type Path_Array_Type = (number | string)[];
export type Path_Type = Path_Array_Type | string;

const castToPath = <T extends Path_Type>(
  initialPath: T,
  separator?: string
) => {
  if (Array.isArray(initialPath)) {
    return initialPath as Path_Array_Type;
  }

  // when initial path is string
  separator = separator || ".";
  const isStringHasSeparator = (initialPath as string).includes(separator);

  return isStringHasSeparator
    ? (initialPath as string).split(separator)
    : ([initialPath] as Path_Array_Type);
};

export default castToPath;
