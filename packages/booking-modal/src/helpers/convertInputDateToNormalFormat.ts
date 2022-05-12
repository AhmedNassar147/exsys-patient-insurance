/*
 *
 * Helper: `convertInputDateToNormalFormat`.
 *
 */

const convertInputDateToNormalFormat = (date: string) => {
  if (date) {
    const [year, day, month] = date.split("/");

    return `${day}-${month}-${year}`;
  }

  return date;
};

export default convertInputDateToNormalFormat;
