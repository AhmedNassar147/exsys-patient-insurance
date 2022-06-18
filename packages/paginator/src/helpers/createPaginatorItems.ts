/*
 *
 * Helper: `createPaginatorItems`.
 *
 */
import { MORE_ARROWS_SIDES } from "../constants";

export const range = (from: number, to: number, step: number = 1) => {
  let i = from;
  let range: number[] = [];

  while (i <= to) {
    range = [...range, i];
    i += step;
  }

  return range;
};

const createPaginatorItems = (
  totalPages: number,
  currentPage: number,
  pageNeighbors: number
) => {
  const totalNumbers = pageNeighbors * 2 + 1;
  if (totalPages > totalNumbers) {
    let pages = [];

    const leftBound = currentPage - pageNeighbors;
    const rightBound = currentPage + pageNeighbors;
    const beforeLastPage = totalPages - 1;

    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleSpillOffset = totalNumbers - pagesCount - 1;

    const leftSpill = startPage > 3;
    const rightSpill = endPage < beforeLastPage;

    const leftSpillPage = MORE_ARROWS_SIDES.LEFT;
    const rightSpillPage = MORE_ARROWS_SIDES.RIGHT;

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1);
      pages = [leftSpillPage, ...extraPages, ...pages];
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset);
      pages = [...pages, ...extraPages, rightSpillPage];
    } else if (leftSpill && rightSpill) {
      pages = [leftSpillPage, ...pages, rightSpillPage];
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};

export default createPaginatorItems;
