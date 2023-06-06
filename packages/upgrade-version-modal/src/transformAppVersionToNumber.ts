/*
 *
 * transformAppVersionToNumber: `@exsys-patient-insurance/upgrade-version-modal`.
 *
 */

const transformAppVersionToNumber = (appVersion?: string | number) => {
  if (!appVersion) {
    return 0;
  }

  if (typeof appVersion === "number") {
    return appVersion;
  }

  return +appVersion.replace(/\.|\s/g, "");
};

export default transformAppVersionToNumber;
