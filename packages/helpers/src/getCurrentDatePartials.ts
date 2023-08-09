/*
 *
 * Helper: `getCurrentDatePartials`.
 *
 */
const formalizeValue = (value: number) => {
  const strValue = value.toString();
  return value < 10 ? `0${strValue}` : strValue;
};

const getCurrentDatePartials = () => {
  const date = new Date();
  const year = date.getFullYear();

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
    hours,
    mins,
  };
};

export default getCurrentDatePartials;
