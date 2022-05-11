/*
 *
 * Package: `@exsys-clinio/button`.
 *
 */
import { memo, useMemo, forwardRef } from "react";
import LoadingIcon from "@exsys-clinio/loading-icon";
import { BaseText } from "@exsys-clinio/text";
import { StyledButton, StyledLink } from "./styled";
import { DEFAULT_PROPS, BUTTON_TYPES, BUTTON_SIZES } from "./constants";
import ButtonProps from "./index.interface";

const Button = (props: ButtonProps, ref: unknown) => {
  const {
    label,
    icon,
    loading,
    htmlType,
    type,
    href,
    target,
    disabled,
    onClick,
    children,
    disableTranslation,
    ...restProps
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const translatedLabel = label && (
    <BaseText
      disableTranslation={disableTranslation}
      children={label}
      tag="fragment"
    />
  );

  const Component = (href ? StyledLink : StyledButton) as React.ElementType;

  const computedExtraProps = useMemo(() => {
    const clickEventProps = {
      onClick: disabled ? undefined : onClick,
    };

    const extraProps = href
      ? { target, href: href, ...clickEventProps }
      : { type: htmlType, ...clickEventProps };

    return extraProps;
  }, [href, htmlType, onClick, disabled, target]);

  const computedIcon = useMemo(
    () => (loading ? <LoadingIcon /> : icon),
    [loading, icon]
  );

  return (
    <Component
      {...restProps}
      disabled={disabled}
      styleType={type}
      {...computedExtraProps}
      ref={ref}
    >
      {computedIcon}
      {translatedLabel}
      {children}
    </Component>
  );
};

export default memo(forwardRef(Button));
export type { ButtonTypes, ButtonSizeType } from "./index.interface";
export { BUTTON_TYPES, BUTTON_SIZES };
