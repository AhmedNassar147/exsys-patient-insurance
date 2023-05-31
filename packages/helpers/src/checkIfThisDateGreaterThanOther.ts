/*
 *
 * Helper: `checkIfThisDateGreaterThanOther`.
 *
 */
import convertNormalFormattedDateToInputDate from "./convertNormalFormattedDateToInputDate";

const checkIfThisDateGreaterThanOther = (
  date1: string | Date,
  date2: string | Date
) => {
  if (!date1 || !date2) {
    return false;
  }
  const firstDate =
    date1 instanceof Date
      ? date1
      : new Date(convertNormalFormattedDateToInputDate(date1));
  const secondDate =
    date2 instanceof Date
      ? date2
      : new Date(convertNormalFormattedDateToInputDate(date2));

  return firstDate > secondDate;
};

export default checkIfThisDateGreaterThanOther;
