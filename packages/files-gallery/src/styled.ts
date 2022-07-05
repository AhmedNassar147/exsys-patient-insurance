/*
 *
 * Styled: `@exsys-patient-insurance/files-gallery`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import Button from "@exsys-patient-insurance/button";
import { WrapperProps, GalleryItemViewProps } from "./index.interface";

export const GalleryWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-wrap: wrap;
  ${({ bordered }) => (bordered ? "border: 1px solid ${colors.gray1}" : "")};
  width: ${({ width }) => width};
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  justify-content: ${({ justify }) => justify};
  border-radius: 3px;
`;

export const GalleryItemView = styled.section<GalleryItemViewProps>`
  position: relative;
  width: ${({ itemWidth }) => itemWidth};
  height: ${({ itemHeight }) => itemHeight};
  border-radius: 4px;
  border: 1px solid ${colors.gray1};
  cursor: pointer;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  top: -9px;
  right: -8px;
`;
