/*
 *
 * Helper: `getDateTime`.
 *
 */
const getLocal = (lang: number | string) => {
  let local = "en-us";

  if (lang === 2) {
    local = "ar-EG";
  }

  return local;
};

export const getCurrentDate = (lang: number | string) => {
  const local = getLocal(lang);

  const isoString = new Date().toISOString();
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(
    local,
    options as Intl.DateTimeFormatOptions
  ).format(date);
};

export const getDateTime = (lang: number | string) => {
  const local = getLocal(lang);
  const date = new Date();

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString(local, options as Intl.DateTimeFormatOptions);
};
