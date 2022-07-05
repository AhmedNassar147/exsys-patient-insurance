/*
 *
 * Styled: `@exsys-patient-insurance/file-upload-input-field`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { BaseText } from "@exsys-patient-insurance/text";
import {
  UploadWrapperProps,
  PlaceholderProps,
  UploadIconProps,
} from "./index.interface";

interface UploadWrapperInternalProps extends UploadWrapperProps {
  borderedWhenHover?: boolean;
}

export const UploadWrapper = styled.div<UploadWrapperInternalProps>`
  position: relative;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  box-sizing: border-box;
  ${({
    height,
    width,
    borderraduis,
    dashed,
    border,
    backgroundcolor,
    margin,
  }) => `
    width: ${width};
    height: ${height};
    ${margin ? `margin: ${margin}` : ""};
    border-radius: ${borderraduis};
    border: ${dashed ? `1px dashed ${colors.grey3}` : border};
    background-color: ${dashed ? colors.white2 : backgroundcolor};
  `};

  ${({ dashed, borderedWhenHover }) =>
    dashed &&
    borderedWhenHover &&
    `
    &:hover {
      border-color: ${colors.appPrimary};
      background-color: ${colors.white};
    }
  `}
`;

export const UploadIconImage = styled.img<UploadIconProps>`
  ${({ uploadIconWidth, uploadIconHeight, hasMessageId }) => `
    width: ${uploadIconWidth};
    height: ${uploadIconHeight};
    margin-bottom: ${hasMessageId ? "8px" : "0px"};
  `};
`;

export const HiddenInput = styled.input`
  font-size: 100px;
  position: absolute;
  inset: 0;
  opacity: 0;
  overflow: hidden;
  outline: 0;
  max-width: 100%;
  z-index: 1;
  border: none;
  &:hover {
    border-color: ${colors.appPrimary};
    background-color: ${colors.white};
  }
`;

export const StyledText = styled(BaseText)`
  font-size: 13px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  line-height: 1.1;
  color: ${colors.inputLabelColor};
`;

export const ImagePlaceHolder = styled.section<PlaceholderProps>`
  width: 100%;
  height: 100%;
  display: flex;
  ${({ placeholderIconWrapperFlexDir }) =>
    placeholderIconWrapperFlexDir || "column"};
  ${({ placeholderIconWrapperGap }) =>
    placeholderIconWrapperGap ? `gap: ${placeholderIconWrapperGap}` : ""};
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  padding: 0 6px;
  ${({ imageUrl }) =>
    imageUrl &&
    `
    background-image: url(${imageUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    padding: 0 2px;
  `}
`;
