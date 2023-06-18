/*
 *
 * Hook: `usePaginatorState`.
 *
 */
import { useState, useMemo, useLayoutEffect } from "react";
import { PaginatorChangedEventData } from "@exsys-patient-insurance/types";
import useCurrentPagePrivileges from "./useCurrentPagePrivileges";
const { min } = Math;

const usePaginatorState = (
  totalItemsInDatabase: number,
  noPagination?: boolean,
  pageSize?: number
) => {
  const [paginationState, setPaginationState] =
    useState<PaginatorChangedEventData>({
      currentPage: 1,
      rowsPerPage: 5,
    });

  const { recordsPerFetch, pagination_size: pageMaxRowsPerPage } =
    useCurrentPagePrivileges({
      useFullPathName: true,
    });

  const currentMaxRowsPerPage = pageSize || pageMaxRowsPerPage || 20;

  const maxRecordsPerPage = useMemo(
    () =>
      min(currentMaxRowsPerPage, recordsPerFetch || 20, totalItemsInDatabase),
    // eslint-disable-next-line
    [totalItemsInDatabase]
  );

  useLayoutEffect(
    () => {
      if (!noPagination) {
        const hasAnyValueNotNumber = [
          currentMaxRowsPerPage,
          totalItemsInDatabase,
        ].some((value) => typeof value !== "number");

        if (hasAnyValueNotNumber) {
          throw new Error(
            "Please make sure these fields always sent from backend AND they are number typed . \n" +
              "1- [pagination_size] from the item privileges API \n" +
              `OR you as a developer forgot to pass the [totalRecordsInDataBase] to the table props \n`
          );
        }

        setPaginationState((previous) => ({
          ...previous,
          rowsPerPage: maxRecordsPerPage,
        }));
      }
    },
    // eslint-disable-next-line
    [maxRecordsPerPage, noPagination]
  );

  return {
    ...paginationState,
    setPaginationState,
  };
};

export { usePaginatorState };
