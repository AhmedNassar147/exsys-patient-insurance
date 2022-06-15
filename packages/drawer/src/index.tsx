/*
 *
 * Package: `@exsys-patient-insurance/drawer`.
 *
 */
import { zIndices } from "@exsys-patient-insurance/theme-values";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import { StyledModal } from "./styled";
import { DrawerProps } from "./index.interface";

const Drawer = (props: DrawerProps) => {
  const isRightToLeft = useMakeSelectIsRTLLayout();

  return (
    <StyledModal
      alignMask="flex-start"
      justifyMask="flex-start"
      // @ts-ignore we know that we pass the prop to the `StyledModal` interface.
      isRightToLeft={`${isRightToLeft}`}
      {...props}
    />
  );
};
Drawer.defaultProps = {
  zIndex: zIndices.drawer,
  width: "300px",
  withOkButton: false,
  reverseHeader: true,
};

export default Drawer;
