/*
 *
 * removePageSuffixFromString
 *
 */
function removePageSuffixFromString(valueString) {
  const PAGE_SUfFIX = "-page";

  const isEndsWithPage = valueString.endsWith(PAGE_SUfFIX);

  return isEndsWithPage ? valueString.replace(PAGE_SUfFIX, "") : valueString;
}

module.exports = removePageSuffixFromString;
