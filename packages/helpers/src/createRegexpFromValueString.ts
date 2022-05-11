/*
 *
 * Helper: `createRegexpFromValueString`.
 *
 */
const flags = ["i", "g", "m", "s", "u", "y"];

const createRegexpFromValueString = (inputValue: string) => {
  // A minimum valid regular expression has at least three characters.
  // @example `/./`.
  if (!inputValue || inputValue.length < 3) {
    return undefined;
  }

  const startsWithSlash = inputValue.startsWith("/");
  const endsWithSlash = inputValue.endsWith("/");

  const pattern = inputValue.split("/").filter(Boolean);

  const patternLength = pattern.length;

  if (!patternLength) {
    return undefined;
  }

  const lastItemIndex = patternLength - 1;

  const lastItem = patternLength > 1 ? pattern[lastItemIndex] : undefined;

  const endsWithFlag =
    !!lastItem &&
    !endsWithSlash &&
    flags.some(flag => lastItem.toLowerCase().includes(flag));

  const flag = endsWithFlag
    ? pattern.splice(lastItemIndex).join("")
    : undefined;

  if (startsWithSlash && (endsWithSlash || endsWithFlag)) {
    try {
      return new RegExp(pattern.join("/"), flag);
    } catch (error) {
      return undefined;
    }
  }

  return undefined;
};

export default createRegexpFromValueString;
