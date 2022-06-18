/*
 *
 * Helper: `createSizeOptions`.
 *
 */
import { DEFAULT_SIZE_OPTIONS } from "../constants";

const createSizeOptions = (totalItems: number) => {
  const notDuplicatedSizes = [
    ...new Set([...DEFAULT_SIZE_OPTIONS, totalItems]),
  ];

  const sizes = notDuplicatedSizes.filter((size) => size <= totalItems);

  if (sizes.length) {
    return sizes.map((size) => ({ key: size, value: `${size} / __t__page` }));
  }

  return [];
};

export default createSizeOptions;
