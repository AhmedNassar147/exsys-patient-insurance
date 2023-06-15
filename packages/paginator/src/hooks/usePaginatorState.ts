/*
 *
 * Hook: `usePaginatorState`.
 *
 */
import { useState, useMemo, useLayoutEffect } from "react";
import { useCurrentPagePrivileges } from "@exsys-patient-insurance/hooks";
import { PaginatorChangedEventData } from "../index.interface";
import {
  globalMaxRecordPerPage,
  currentPageMaxRowsPerPage,
} from "../constants";
const { min } = Math;

const usePaginatorState = (
  totalItemsInDatabase: number,
  noPagination?: boolean
) => {
  const [paginationState, setPaginationState] =
    useState<PaginatorChangedEventData>({
      currentPage: 1,
      rowsPerPage: 5,
    });

  // const globalMaxRecordPerPage = useMakeSelectMaxRecordsPerPage();
  const { pagination_size: currentPageMaxRowsPerPagePrivilege } =
    useCurrentPagePrivileges({
      useFullPathName: true,
    });

  const maxRecordsPerPage = useMemo(
    () =>
      min(
        currentPageMaxRowsPerPagePrivilege || currentPageMaxRowsPerPage,
        globalMaxRecordPerPage,
        totalItemsInDatabase
      ),
    // eslint-disable-next-line
    [totalItemsInDatabase]
  );

  useLayoutEffect(
    () => {
      if (!noPagination) {
        const hasAnyValueNotNumber = [
          currentPageMaxRowsPerPage,
          globalMaxRecordPerPage,
          totalItemsInDatabase,
        ].some((value) => typeof value !== "number");

        if (hasAnyValueNotNumber) {
          throw new Error(
            "Please make sure these fields always sent from backend AND they are number typed . \n" +
              "1- [pagination_size] from the item privileges API \n" +
              `2- [max_record_per_page] from the login config data \n` +
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
    [maxRecordsPerPage]
  );

  return {
    ...paginationState,
    setPaginationState,
  };
};

export default usePaginatorState;
