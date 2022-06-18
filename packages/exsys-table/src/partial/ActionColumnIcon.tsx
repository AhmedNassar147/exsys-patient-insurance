/*
 *
 * Component: `ActionColumnIcon`.
 *
 */
import { useMemo, useCallback, memo } from "react";
import { useTranslateIdFactory } from "@exsys-patient-insurance/labels-provider";
import Button from "@exsys-patient-insurance/button";
import Flex from "@exsys-patient-insurance/flex";
import { colors } from "@exsys-patient-insurance/theme-values";
import { ACTION_COLUMN_ICONS, ACTION_ICON_NAMES } from "../constants";
import {
  TableRowRecordType,
  TableActionColumnProps,
  TableActionIconNamesType,
  TableActionElementType,
} from "@exsys-patient-insurance/types";
import ActionColumnCellWrapper from "./ActionColumnCellWrapper";

const { isArray } = Array;

interface ActionColumnProps<T extends TableRowRecordType>
  extends TableActionColumnProps<T> {
  fontSize?: string;
  currentRecord: T;
  rowIndex: number;
  actionColumnWidth?: number;
}

const ActionColumnIcon = <T extends TableRowRecordType>({
  onPressActionIcon,
  actionRowDisabled,
  actionLabelId,
  actionIcon,
  fontSize,
  currentRecord,
  rowIndex,
  actionColumnWidth,
}: ActionColumnProps<T>) => {
  const translateLabel = useTranslateIdFactory();

  const currentCellDisabled = useMemo(
    () =>
      actionRowDisabled instanceof Function
        ? actionRowDisabled(currentRecord, rowIndex)
        : false,
    [actionRowDisabled, currentRecord, rowIndex]
  );

  const baseIconLabel = actionLabelId
    ? (translateLabel(actionLabelId) as string)
    : "";

  const handleCellClicked = useCallback(
    (currentActionItemKey?: string) => () =>
      currentCellDisabled
        ? undefined
        : onPressActionIcon?.(currentRecord, rowIndex, currentActionItemKey),

    [currentCellDisabled, onPressActionIcon, currentRecord, rowIndex]
  );

  const getActionIcon = useCallback(
    (
      actionIcon?: TableActionIconNamesType,
      props?: Omit<
        TableActionElementType,
        "type" | "buttonSize" | "buttonType"
      > & { rowKey: string }
    ) => {
      const { width, height, color, label, rowKey } = props || {};

      const actionIconName = actionIcon || ACTION_ICON_NAMES.details;
      const LazyLoadedIcon = ACTION_COLUMN_ICONS[actionIconName];
      const actionIconColor =
        color ||
        (actionIconName === ACTION_ICON_NAMES.delete ? "red23" : "appPrimary");

      return (
        <i
          title={label}
          key={rowKey}
          onClick={rowKey ? handleCellClicked(rowKey) : undefined}
        >
          <LazyLoadedIcon
            shouldMountChunk
            color={colors[actionIconColor]}
            width={width || "1.8em"}
            height={height || "1.7em"}
            disabled={currentCellDisabled}
          />
        </i>
      );
    },
    [currentCellDisabled, handleCellClicked]
  );

  const renderActionContent = useCallback(
    (actionIcon: TableActionElementType[]) =>
      actionIcon.map(({ type, iconName, ...otherProps }, index) => {
        const isIcon = type === "icon";
        const {
          backgroundColor,
          label,
          color,
          width,
          height,
          buttonType,
          buttonSize,
        } = otherProps;

        const key = `${index + 1}`;

        return isIcon ? (
          getActionIcon(iconName, {
            width,
            height,
            color,
            label,
            rowKey: key,
          })
        ) : (
          <Button
            label={label}
            backgroundcolor={backgroundColor}
            color={color}
            width={width}
            height={height}
            type={buttonType}
            size={buttonSize}
            key={key}
            onClick={handleCellClicked(key)}
          />
        );
      }),
    [getActionIcon, handleCellClicked]
  );

  const isActionIconString = typeof actionIcon === "string";

  return (
    <ActionColumnCellWrapper
      fontSize={fontSize}
      onClick={isActionIconString ? handleCellClicked() : undefined}
      disabled={currentCellDisabled}
      actionColumnWidth={actionColumnWidth}
    >
      {actionIcon && isArray(actionIcon) && !!actionIcon.length && (
        <Flex width="100%" gap="5px" align="center" justify="center">
          {renderActionContent(actionIcon)}
        </Flex>
      )}

      {actionIcon &&
        typeof actionIcon === "string" &&
        getActionIcon(actionIcon, {
          label: baseIconLabel,
          rowKey: "1",
        })}
    </ActionColumnCellWrapper>
  );
};
ActionColumnIcon.defaultProps = {
  actionLabelId: "dtls",
  actionIcon: ACTION_ICON_NAMES.details,
};

export default memo(ActionColumnIcon);
