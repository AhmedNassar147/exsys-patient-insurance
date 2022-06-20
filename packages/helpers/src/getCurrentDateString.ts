/*
 *
 * Helper: `getCurrentDateString`.
 *
 */
const to2Digits = (value: string) =>
  !value || value.length === 1 ? `0${value || 0}` : value;

const getCurrentDateString = (useNativeInputFormat?: boolean) => {
  const [day, month, year] = new Intl.DateTimeFormat(["ban", "id"])
    .format(new Date())
    .split("/");

  let parts = [year, to2Digits(month), to2Digits(day)];
  if (!useNativeInputFormat) parts = parts.reverse();

  return parts.join("-");
};

export default getCurrentDateString;
