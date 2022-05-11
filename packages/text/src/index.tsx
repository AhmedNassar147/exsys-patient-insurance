/*
 *
 * Package: `@exsys-clinio/text`.
 *
 */
import { useTranslateIdFactory } from "@exsys-clinio/labels-provider";
import styled from "styled-components";
import styleSheet from "./styled";
import { BaseTextProps, TextProps } from "./index.interface";

export const BaseText = ({
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

export default styled(BaseText)<TextProps>`
  ${styleSheet}
`;

export type { TextProps } from "./index.interface";
