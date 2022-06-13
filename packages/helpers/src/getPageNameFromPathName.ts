/*
 *
 * `getPageNameFromPathName`: `@exsys-patient-insurance/helpers`.
 *
 */
const getPageNameFromPathName = (pathname?: string): string => {
  pathname = pathname || window.location.pathname;

  const parsedName = pathname.split(/\/([a-zA-Z0-9]{0,})/)[1];
  return parsedName || "login";
};

export default getPageNameFromPathName;
