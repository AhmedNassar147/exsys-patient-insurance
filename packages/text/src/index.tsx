/*
 *
 * Package: `@exsys-patient-insurance/text`.
 *
 */
import styled from "styled-components";
import { useTranslateIdFactory } from "@exsys-patient-insurance/labels-provider";
import { colors } from "@exsys-patient-insurance/theme-values";
import styleSheet from "./styled";
import { TitleProps } from "./index.interface";

import { BaseTextProps, TextProps } from "./index.interface";

const BaseText = ({
  children,
  tag,
  disableTranslation,
  ...otherProps
}: BaseTextProps) => {
  const translateLabel = useTranslateIdFactory();

  const translatedLabel = disableTranslation
    ? children
    : translateLabel(children as string);

  if (tag === "fragment") {
    return <>{translatedLabel}</>;
  }

  const ProperTag = (tag || "p") as React.ElementType<BaseTextProps>;

  return <ProperTag children={translatedLabel} {...otherProps} />;
};

const Text = styled(BaseText)<TextProps>`
  ${styleSheet}
`;

const PageTitle = styled(Text)<TitleProps>`
  border-bottom: ${({ bottomborder, bordercolor }) =>
    bottomborder ? `1px solid ${bordercolor}` : "unset"};
  text-align: ${({ center }) => (center ? "center" : "start")};
`;
PageTitle.defaultProps = {
  fontSize: "20px",
  margin: "10px 0px 5px 0px",
  weight: "300",
  color: colors.appPrimary,
  bordercolor: colors.grey3,
};

export default Text;
export { PageTitle, BaseText };
export type { TextProps } from "./index.interface";
