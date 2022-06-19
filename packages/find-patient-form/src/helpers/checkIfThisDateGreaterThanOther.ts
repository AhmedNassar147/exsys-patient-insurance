/*
 *
 * Helper: `checkIfThisDateGreaterThanOther`.
 *
 */
import convertNormalFormattedDateToInputDate from "./convertNormalFormattedDateToInputDate";

const checkIfThisDateGreaterThanOther = (
  date1: string | Date,
  date2: string
) => {
  if (!date1 || !date2) {
    return false;
  }
  const firstDate =
    date1 instanceof Date
      ? date1
      : new Date(convertNormalFormattedDateToInputDate(date1));
  const secondDate = new Date(convertNormalFormattedDateToInputDate(date2));

  return firstDate > secondDate;
};

export default checkIfThisDateGreaterThanOther;
