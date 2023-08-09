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
  const { recordsPerFetch, pagination_size: pageMaxRowsPerPage } =
    useCurrentPagePrivileges({
      useFullPathName: true,
    });

  const currentMaxRowsPerPage = pageSize || pageMaxRowsPerPage || 20;

  const [paginationState, setPaginationState] =
    useState<PaginatorChangedEventData>({
      currentPage: 1,
      rowsPerPage: currentMaxRowsPerPage,
    });

  useLayoutEffect(() => {
    if (currentMaxRowsPerPage) {
      setPaginationState((previous) => ({
        ...previous,
        rowsPerPage: currentMaxRowsPerPage,
      }));
    }
  }, [currentMaxRowsPerPage]);

  const minRecordsPerPage = useMemo(
    () =>
      min(
        ...[
          currentMaxRowsPerPage,
          recordsPerFetch || 20,
          totalItemsInDatabase,
        ].filter(Boolean)
      ),
    // eslint-disable-next-line
    [recordsPerFetch, currentMaxRowsPerPage, totalItemsInDatabase]
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
          rowsPerPage: minRecordsPerPage,
        }));
      }
    },
    // eslint-disable-next-line
    [minRecordsPerPage, noPagination]
  );

  const initialRowsPerPage = minRecordsPerPage || currentMaxRowsPerPage;

  return {
    ...paginationState,
    initialRowsPerPage,
    setPaginationState,
  };
};

export { usePaginatorState };
