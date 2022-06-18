/*
 *
 * Package: `@exsys-patient-insurance/table-default-header-tools`.
 *
 */
import { memo, useMemo } from "react";
import LazyDownloadExcel from "@exsys-patient-insurance/download-excel";
import DeleteIcon from "@exsys-patient-insurance/delete-icon";
import FilePdfIcon from "@exsys-patient-insurance/file-pdf-icon";
import PlusIcon from "@exsys-patient-insurance/plus-icon";
import InfoIcon from "@exsys-patient-insurance/info-icon";
import SaveIcon from "@exsys-patient-insurance/save-icon";
import EditIcon from "@exsys-patient-insurance/edit-icon";
import { TableDefaultHeaderToolsProps } from "@exsys-patient-insurance/types";
import { ToolsContainer } from "./styled";
import { TABLE_DEFAULT_HEADER_TOOLS_DEFAULT_PROPS } from "./constants";

const TableDefaultHeaderTools = ({
  onPressSaveOrEdit,
  onPressPrintPdf,
  onPressAdd,
  onPressDelete,
  onPressInfoIcon,
  isEditing,
  hasDataSource,
  hasSelectedRow,
  canInsert,
  canDelete,
  canEdit,
  withInfo,
  withExcel,
  withPdf,
  showSaveIcon,
  excelSheetProps,
}: TableDefaultHeaderToolsProps) => {
  const { sheets } = excelSheetProps || {};

  const SaveOrEditIcon = useMemo(
    () => (isEditing || showSaveIcon ? SaveIcon : EditIcon),
    [isEditing, showSaveIcon]
  );

  return (
    <ToolsContainer>
      {(canEdit || showSaveIcon) && (
        <SaveOrEditIcon
          disabled={!hasSelectedRow}
          onClick={onPressSaveOrEdit}
          useDisabledColor
        />
      )}

      {canDelete && (
        <DeleteIcon
          disabled={!hasSelectedRow}
          useDisabledColor
          onClick={onPressDelete}
        />
      )}

      {canInsert && <PlusIcon useDisabledColor circled onClick={onPressAdd} />}

      {!!sheets?.length && withExcel && (
        <LazyDownloadExcel
          {...excelSheetProps}
          disabled={!hasDataSource}
          shouldMountChunk
        />
      )}

      {withPdf && (
        <FilePdfIcon
          useDisabledColor
          disabled={!hasDataSource}
          onClick={onPressPrintPdf}
        />
      )}

      {withInfo && (
        <InfoIcon
          disabled={!hasSelectedRow}
          useDisabledColor
          circled
          onClick={onPressInfoIcon}
        />
      )}
    </ToolsContainer>
  );
};
TableDefaultHeaderTools.defaultProps = TABLE_DEFAULT_HEADER_TOOLS_DEFAULT_PROPS;

export default memo(TableDefaultHeaderTools);
export { TABLE_DEFAULT_HEADER_TOOLS_DEFAULT_PROPS };
