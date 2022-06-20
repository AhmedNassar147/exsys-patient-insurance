/*
 *
 * Helper: `convertInputDateToNormalFormat`.
 *
 */
const convertInputDateToNormalFormat = (date: string) => {
  if (date) {
    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  }

  return date;
};

export default convertInputDateToNormalFormat;
