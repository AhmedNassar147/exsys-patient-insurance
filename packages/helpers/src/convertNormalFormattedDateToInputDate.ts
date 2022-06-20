/*
 *
 * Helper: `convertNormalFormattedDateToInputDate`.
 *
 */
const convertNormalFormattedDateToInputDate = (date: string) => {
  if (date) {
    const [day, month, year] = date.split("-");

    return `${year}-${month}-${day}`;
  }

  return date;
};

export default convertNormalFormattedDateToInputDate;
