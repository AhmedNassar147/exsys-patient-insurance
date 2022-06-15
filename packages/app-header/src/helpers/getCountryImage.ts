/*
 *
 * Helper: `getCountryImage`.
 *
 */
const getCountryImage = (countryCode: string) => {
  if (countryCode) {
    countryCode = countryCode.toLowerCase();
    return require(`../assets/${countryCode}.jpg`);
  }
};

export default getCountryImage;
