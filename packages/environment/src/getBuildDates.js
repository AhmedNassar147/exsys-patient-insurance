/*
 *
 * `getBuildDates`: `@exsys-patient-insurance/environment`.
 *
 */

const formalizeValue = (value) => {
  const strValue = value.toString();
  return value < 10 ? `0${strValue}` : strValue;
};

const date = new Date();
const year = date.getFullYear().toString().substr(-1);

const month = formalizeValue(date.getMonth() + 1);
const day = formalizeValue(date.getDate());
const mins = formalizeValue(date.getMinutes());
const hours = formalizeValue(date.getHours());
const time = `${hours}${mins}`;

module.exports = {
  year,
  month,
  day,
  time,
};
