/*
 *
 * Helper: `addAmountToDate`.
 *
 */
import convertNormalFormattedDateToInputDate from "./convertNormalFormattedDateToInputDate";

const addAmountToDate = (date: string | Date, amount?: number) => {
  const nativeFormattedDate =
    date instanceof Date
      ? date
      : new Date(convertNormalFormattedDateToInputDate(date));

  nativeFormattedDate.setDate(nativeFormattedDate.getDate() + (amount || 0));
  return nativeFormattedDate;
};

export default addAmountToDate;
