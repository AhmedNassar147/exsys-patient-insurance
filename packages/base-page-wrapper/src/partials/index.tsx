/*
 *
 * Component: `@exsys-patient-insurance/base-page-wrapper`.
 *
 */
import { memo, useState, useLayoutEffect } from "react";
import type { SizeType } from "@exsys-patient-insurance/app-sidebar";
import { getItemFromStorage } from "@exsys-patient-insurance/helpers";
import Modal from "@exsys-patient-insurance/modal";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import Text from "@exsys-patient-insurance/text";
import SideBarWithItem from "./SideBarWithItem";
import { BasePageWrapper, BasePageContent } from "../styled";
import { BasePageComponentProps } from "../index.interface";

const BasePageComponent = ({ children }: BasePageComponentProps) => {
  const [sideBarSize, setSideBarSize] = useState<SizeType>("small");
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  useLayoutEffect(() => {
    const currentPassword = getItemFromStorage<string>("password");
    if (currentPassword === "123456") {
      handleOpen();
    }
  }, [handleOpen]);

  return (
    <>
      <BasePageWrapper>
        <SideBarWithItem
          sideBarSize={sideBarSize}
          setSideBarSize={setSideBarSize}
        />
        <BasePageContent sideBarSize={sideBarSize}>{children}</BasePageContent>
      </BasePageWrapper>

      <Modal
        title=" "
        width="800px"
        onClose={handleClose}
        maskClosable={false}
        keyboard={false}
        visible={visible}
        noFooter
        usePortal
      >
        <Text
          children="mstchngpass"
          align="center"
          margin="10px 0"
          width="100%"
          weight="bold"
          fontSize="ff00"
        />
      </Modal>
    </>
  );
};

export default memo(BasePageComponent);
