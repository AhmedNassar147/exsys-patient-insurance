/*
 *
 * whenComponentTypeIsPage
 *
 */
const { getTypeOfComponentPackage } = require("./reactComponentUtils");

function whenComponentTypeIsPage({ type }) {
  const { isPage } = getTypeOfComponentPackage(type);
  return isPage;
}

module.exports = whenComponentTypeIsPage;
