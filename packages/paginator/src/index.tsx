/*
 *
 * Package: `@exsys-patient-insurance/paginator`.
 *
 */
import { memo, useMemo, useCallback } from "react";
import SelectField from "@exsys-patient-insurance/select-field";
import { useCurrentPagePrivileges } from "@exsys-patient-insurance/hooks";
import { onChangeEvent, PaginatorProps } from "@exsys-patient-insurance/types";
import createPaginatorItems from "./helpers/createPaginatorItems";
import createSizeOptions from "./helpers/createSizeOptions";
import PaginatorItemArrow from "./partials/PaginatorItemArrow";
import {
  StyledList,
  PaginatorItem,
  BasePaginatorItem,
  InputsWrapper,
} from "./styled";
import { MORE_ARROWS_SIDES } from "./constants";

const { ceil, min } = Math;

const Paginator = ({
  margin,
  disabled,
  totalItems,
  currentPage,
  hideOnSinglePage,
  onChange,
  rowsPerPage,
}: PaginatorProps) => {
  const { recordsPerFetch } = useCurrentPagePrivileges({
    useFullPathName: true,
  });

  const sizesOptions = useMemo(
    () => createSizeOptions(min(totalItems, recordsPerFetch || 20)),
    [totalItems]
  );

  const totalPages = ceil(totalItems / rowsPerPage);
  const isLastPage = currentPage === totalPages;

  const paginatorItems = useMemo(
    () => createPaginatorItems(totalPages, currentPage, 1),
    [totalPages, currentPage]
  );

  const isSinglePage = totalPages === 1;

  const onSelectPage = useCallback(
    (nextPage: number) => () => {
      onChange?.({
        rowsPerPage,
        currentPage: nextPage,
      });
    },
    [onChange, rowsPerPage]
  );

  const onSizeChange: onChangeEvent<number> = useCallback(
    ({ value }) => {
      const nextRowsPerPage = +value;
      onChange?.({
        rowsPerPage: nextRowsPerPage,
        currentPage,
      });
    },
    [currentPage, onChange]
  );

  if (hideOnSinglePage && isSinglePage) {
    return null;
  }

  // const showSizeChanger = sizesOptions?.length > 1;
  const showSizeChanger = true;

  const isFirstPage = currentPage === 1;
  const currentLoadedPagesItems = currentPage * rowsPerPage;
  const nextIconDisabled =
    disabled || isSinglePage || currentLoadedPagesItems >= totalItems;

  const maxLoadedRecord = isLastPage ? totalItems : currentLoadedPagesItems;
  const minLoadedRecord = currentLoadedPagesItems - rowsPerPage + 1;
  const totalRecordsText = `${minLoadedRecord}-${maxLoadedRecord} __t__of ${totalItems} __t__recrds`;

  return (
    <StyledList margin={margin}>
      <PaginatorItemArrow
        direction="left"
        disabled={disabled || isFirstPage}
        onClick={onSelectPage(currentPage - 1)}
      />

      {paginatorItems.map((page) => {
        const selected = currentPage === page;
        const isSelectedOrDisabled = selected || disabled;
        const isDoubledLeftArrows = page === MORE_ARROWS_SIDES.LEFT;
        const isDoubledRightArrows = page === MORE_ARROWS_SIDES.RIGHT;

        if (isDoubledLeftArrows || isDoubledRightArrows) {
          const nextPageNoFromDoubledArrowsEvent = isDoubledLeftArrows
            ? currentPage - 2
            : currentPage + 2;

          return (
            <PaginatorItemArrow
              key={page}
              doubledArrows
              direction={isDoubledLeftArrows ? "left" : "right"}
              onClick={onSelectPage(nextPageNoFromDoubledArrowsEvent)}
            />
          );
        }

        return (
          <PaginatorItem
            key={page}
            disabled={disabled}
            selected={selected}
            children={page}
            onClick={
              isSelectedOrDisabled ? undefined : onSelectPage(page as number)
            }
          />
        );
      })}

      <PaginatorItemArrow
        direction="right"
        disabled={nextIconDisabled}
        onClick={onSelectPage(currentPage + 1)}
      />

      {showSizeChanger && (
        <InputsWrapper>
          <SelectField
            width="90px"
            height="29px"
            allowClear={false}
            value={rowsPerPage}
            showSearch={false}
            options={sizesOptions}
            onChange={onSizeChange}
            name="rowsPerPage"
          />
        </InputsWrapper>
      )}
      <BasePaginatorItem>{totalRecordsText}</BasePaginatorItem>
    </StyledList>
  );
};

export default memo(Paginator);
