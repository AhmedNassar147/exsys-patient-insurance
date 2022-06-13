/*
 *
 * Package: `@exsys-patient-insurance/menu-item`.
 *
 */
import CheckIcon from "@exsys-patient-insurance/check-icon";
import { colors } from "@exsys-patient-insurance/theme-values";
import { BaseMenuItem, ChildrenContainer } from "./styled";
import { MenuItemProps } from "./index.interface";

const { appPrimary } = colors;

export const MENU_ITEM_DEFAULT_PROPS = Object.freeze({
  padding: "0 5px",
  height: "27px",
  hideCheckIcon: false,
});

const MenuItem = ({
  selected,
  children,
  hideCheckIcon,
  ...props
}: MenuItemProps) => (
  <BaseMenuItem {...props} selected={selected}>
    <ChildrenContainer>{children}</ChildrenContainer>
    {selected && !hideCheckIcon && <CheckIcon color={appPrimary} />}
  </BaseMenuItem>
);
MenuItem.defaultProps = MENU_ITEM_DEFAULT_PROPS;

export default MenuItem;
