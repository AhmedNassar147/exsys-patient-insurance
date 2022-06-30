/*
 *
 * Helper: `generateDefaultMonthAndYear`.
 *
 */
interface GenerateDefaultMonthAndYearOptionsType {
  yearsBeforeOfAfter?: number;
  monthsBeforeOrAfter?: number;
}

const DEFAULT_OPTIONS = {
  yearsBeforeOfAfter: 0,
  monthsBeforeOrAfter: -1,
};

const toTWoDigits = (value: number) => {
  const valeString = value.toString();
  return valeString.length > 1 ? valeString : `0${valeString}`;
};

const generateDefaultMonthAndYear = (
  options?: GenerateDefaultMonthAndYearOptionsType
) => {
  const { yearsBeforeOfAfter, monthsBeforeOrAfter } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return {
    month: toTWoDigits(currentMonth + monthsBeforeOrAfter || 1),
    year: currentYear + yearsBeforeOfAfter,
  };
};

export default generateDefaultMonthAndYear;
