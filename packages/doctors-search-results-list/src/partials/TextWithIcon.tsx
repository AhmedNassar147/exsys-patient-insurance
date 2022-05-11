/*
 *
 * Component: `TextWithIcon`.
 *
 */
import { memo } from "react";
import Text from "@exsys-clinio/text";
import Flex from "@exsys-clinio/flex";
import { spacings } from "@exsys-clinio/theme-values";
import { FontSizeType } from "@exsys-clinio/types";

interface TextWithIconProps {
  disableTranslation?: boolean;
  icon: React.MemoExoticComponent<() => JSX.Element>;
  textValue: string;
  lines?: number;
  color: string;
  weight?: string;
  fontSize?: FontSizeType;
}

const TextWithIcon = memo(
  ({
    disableTranslation,
    icon: Icon,
    textValue,
    color,
    lines,
    fontSize,
    weight,
  }: TextWithIconProps) => (
    <Flex width="100%" gap={spacings.sp2} align="center">
      <Icon />
      <Text
        disableTranslation={disableTranslation}
        children={textValue}
        color={color}
        fontSize={fontSize}
        lines={lines}
        weight={weight}
        width="inherit"
      />
    </Flex>
  )
);

export default TextWithIcon;
