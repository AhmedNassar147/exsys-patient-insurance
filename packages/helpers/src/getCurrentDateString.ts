/*
 *
 * Helper: `getCurrentDateString`.
 *
 */
const to2Digits = (value: string) =>
  !value || value.length === 1 ? `0${value || 0}` : value;

type GetCurrentDateStringOptionsType = {
  useNativeInputFormat?: boolean;
  useDateTime?: boolean;
  year?: number;
  month?: number;
  day?: number;
};

const getCurrentDateString = (options?: GetCurrentDateStringOptionsType) => {
  const date = new Date();

  const {
    useNativeInputFormat,
    useDateTime,
    year: newYear,
    month: newMonth,
    day: newDay,
  } = options || {};

  if (newYear || newMonth || newDay) {
    date.setFullYear(
      newYear || date.getFullYear(),
      newMonth || date.getMonth(),
      newDay || date.getDate()
    );
  }

  const [day, month, year] = new Intl.DateTimeFormat(["ban", "id"])
    .format(date)
    .split("/");

  let parts = [year, to2Digits(month), to2Digits(day)];
  if (!useNativeInputFormat) parts = parts.reverse();

  let partsString = parts.join("-");

  if (useDateTime) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPMLabel = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;

    partsString += ` ${hours}:${minutesString} ${amPMLabel}`;
  }

  return partsString;
};

export default getCurrentDateString;
