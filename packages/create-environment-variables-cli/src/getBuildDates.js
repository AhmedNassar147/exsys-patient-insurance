/*
 *
 * getBuildDates: `@exsys-patient-insurance/create-environment-variables-cli`.
 *
 */
const formalizeValue = (value) => {
  const strValue = value.toString();
  return value < 10 ? `0${strValue}` : strValue;
};

module.exports = () => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-1);

  const month = formalizeValue(date.getMonth() + 1);
  const day = formalizeValue(date.getDate());
  const mins = formalizeValue(date.getMinutes());
  const hours = formalizeValue(date.getHours() + 1);
  const time = `${hours}${mins}`;

  return {
    year,
    month,
    day,
    time,
  };
};
