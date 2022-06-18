/*
 *
 * Types: `@exsys-patient-insurance/paginator`.
 *
 */
export interface PaginatorBaseProps {
  margin?: string;
}

export interface PaginatorItemProps {
  disabled?: boolean;
  selected?: boolean;
}

export type PaginatorChangedEventData = {
  currentPage: number;
  rowsPerPage: number;
};

export type OnPaginatorChangedActionType = (
  event: PaginatorChangedEventData
) => void | React.Dispatch<React.SetStateAction<PaginatorChangedEventData>>;

export interface PaginatorProps
  extends PaginatorBaseProps,
    PaginatorChangedEventData {
  totalItems: number;
  hideOnSinglePage?: boolean;
  showQuickJumper?: boolean;
  disabled?: boolean;
  onChange?: OnPaginatorChangedActionType;
}
