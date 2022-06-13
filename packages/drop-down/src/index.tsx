/*
 *
 * Package: `@exsys-patient-insurance/drop-down`.
 *
 */
import { useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import { zIndices } from "@exsys-patient-insurance/theme-values";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import {
  useOpenCloseActionsWithState,
  useBoundingClientRect,
} from "@exsys-patient-insurance/hooks";
import { InternalTrigger, StyledModal } from "./styled";
import {
  DropDownProps,
  DropdownRefType,
  DropdownValuesForRefType,
} from "./index.interface";

const { dropDown: baseDropdownZIndex } = zIndices;

const DropDown = (
  {
    disabled,
    triggerWidth,
    margin,
    trigger,
    tabIndex,
    className,
    onOpen,
    onBeforeClose,
    children,
    zIndex = baseDropdownZIndex,
    menuWidth,
    usePortal,
    subtractionSidesValue,
  }: DropDownProps,
  ref?: DropdownRefType
) => {
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();
  const [elementRef, rect] = useBoundingClientRect([visible]);

  const openModalHandler = useCallback(() => {
    if (!disabled) {
      handleOpen();
      onOpen?.();
    }
  }, [disabled, onOpen, handleOpen]);

  const handleCloseModal = useCallback(() => {
    onBeforeClose?.();
    handleClose();
  }, [handleClose, onBeforeClose]);

  useImperativeHandle(ref, () => ({
    openDropdown: openModalHandler,
    closeDropdown: handleCloseModal,
  }));

  const getRectValue = useCallback(
    (value?: number, triggerHeight?: number) =>
      typeof value === "number" ? `${value + (triggerHeight || 0)}px` : "unset",
    []
  );

  const isRightToLeft = useMakeSelectIsRTLLayout();

  const {
    top,
    left,
    right,
    width: rectBoundingWidth,
    height: triggerHeight,
  } = rect || {};

  const modalWidth =
    menuWidth || (rectBoundingWidth ? `${rectBoundingWidth}px` : triggerWidth);

  const modalRectBoundingProps = useMemo(() => {
    const leftValue = getRectValue(left);
    const rightValue = getRectValue(right);

    return {
      top: getRectValue(top, (triggerHeight || 0) + 3),
      left: subtractionSidesValue
        ? `calc(${leftValue} - ${subtractionSidesValue})`
        : leftValue,
      right: subtractionSidesValue
        ? `calc(${rightValue} + ${subtractionSidesValue})`
        : rightValue,
      isRightToLeft: `${isRightToLeft}`,
    };
  }, [
    getRectValue,
    left,
    right,
    top,
    triggerHeight,
    isRightToLeft,
    subtractionSidesValue,
  ]);

  return (
    <>
      <InternalTrigger
        margin={margin}
        triggerWidth={triggerWidth}
        tabIndex={tabIndex}
        onClick={openModalHandler}
        disabled={disabled}
        ref={elementRef}
        className={className}
      >
        {trigger}
      </InternalTrigger>

      <StyledModal
        visible={visible}
        noHeader
        onClose={handleCloseModal}
        {...modalRectBoundingProps}
        width={modalWidth}
        bodyPadding="0px"
        bodyMinHeight="unset"
        noFooter
        destroyOnClose={false}
        zIndex={zIndex}
        alignMask="flex-start"
        justifyMask="flex-start"
        usePortal={usePortal}
      >
        {children}
      </StyledModal>
    </>
  );
};

export default forwardRef<DropdownValuesForRefType | undefined, DropDownProps>(
  // @ts-ignore react `forwardRef` it doesn't work well with generics.
  DropDown
);
export { default as useDropdownRef } from "./hooks/useDropdownRef";
