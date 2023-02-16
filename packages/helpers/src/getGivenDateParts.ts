/*
 *
 * Helpers: `getGivenDateParts`.
 *
 */
export const getGivenDateParts = (date?: Date) => {
  date = date || new Date();
  const dateFullYear = date.getFullYear();
  const dateMonth = date.getMonth();

  const firstDayDate = new Date(dateFullYear, dateMonth, 1);
  const lastDayDate = new Date(dateFullYear, dateMonth + 1, 0);

  return {
    firstDayDate,
    lastDayDate,
    dateFullYear,
  };
};
