/*
 *
 * Types: `@exsys-patient-insurance/exsys-table-with-api-query`.
 *
 */
import {
  TableRowRecordType,
  TableProps,
  ApiIdsTypes,
  TableQueryAPiResponseType,
  RecordTypeWithAnyValue,
  UseBasicRunQueryFnType,
} from "@exsys-patient-insurance/types";

export type TableForwardedValuesForRef<TableRecordType> = {
  runQuery: UseBasicRunQueryFnType<
    TableQueryAPiResponseType<TableRecordType[]>
  >;
  setTableData: React.Dispatch<React.SetStateAction<TableRecordType[]>>;
  getCurrentDataSource: () => TableRecordType[];
};

export type TableForwardedRefType<TableRecordType> = React.MutableRefObject<
  TableForwardedValuesForRef<TableRecordType> | undefined
>;

export interface UseCreateTableActionsFromRefToFormValuesType<TableRecordType> {
  tableValuesRef: React.MutableRefObject<
    TableForwardedValuesForRef<TableRecordType> | undefined
  >;
  fetchTableData: UseBasicRunQueryFnType<
    TableQueryAPiResponseType<TableRecordType[]>
  >;
  setTableData: (
    nextTableData:
      | TableRecordType[]
      | ((previous: TableRecordType[]) => TableRecordType[])
  ) => void | undefined;
  getCurrentDataSource: () => TableRecordType[];
}

export interface TableWithApiQueryProps<T extends TableRowRecordType>
  extends Omit<
    TableProps<T>,
    | "dataSource"
    | "totalRecordsInDataBase"
    | "onSearchAndFilterTable"
    | "resetTableFilters"
    | "onFetchMore"
    | "loading"
    | "rowsPerPage"
    | "setPaginationState"
    | "currentPage"
  > {
  queryApiId: ApiIdsTypes;
  callOnFirstRender?: boolean;
  baseQueryAPiParams?: RecordTypeWithAnyValue;
  handleSearchOnFirstRender?: () => void;
  transformQueryApiData?: (data: any) => undefined | T[];
  transformDataSource?: (currentDataSource: T[]) => T[];
  skipQuery?: boolean | ((params: Record<string, any>) => boolean);
  allowPassingChangeEventOnDone?: boolean;
}
