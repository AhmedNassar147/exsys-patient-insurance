/*
 *
 * Styled: `@exsys-patient-insurance/app-header`.
 *
 */
import styled, { css } from "styled-components";
import Flex from "@exsys-patient-insurance/flex";
import { BaseText } from "@exsys-patient-insurance/text";
import {
  APP_HEADER_HEIGHT,
  APP_HEADER_MARGIN,
  APP_HEADER_HORIZONTAL_PADDING,
} from "@exsys-patient-insurance/global-app-constants";
import {
  colors,
  spacings,
  zIndices,
  fontSizes,
} from "@exsys-patient-insurance/theme-values";
import mediaQueries from "@exsys-patient-insurance/media-queries";

export const StyledHeader = styled.header<{ isLoginPage?: boolean }>`
  height: ${APP_HEADER_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};
  margin-bottom: ${APP_HEADER_MARGIN};
  background-color: ${colors.white};
  z-index: ${zIndices.appHeader};
  ${({ isLoginPage }) =>
    isLoginPage
      ? ""
      : `
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    -webkit-box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
    box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
    border-bottom: 1px solid ${colors.inputBorderColor};
  `};
`;

// export const StyledAppLogo = styled.svg`
//   height: ${spacings.sp10};
//   width: ${spacings.sp18};
//   ${mediaQueries.md`
//    width: ${spacings.sp25};
//  `}
// `;

export const UserNameHead = styled.p`
  flex: 1;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1;
  font-size: 1rem;
  word-break: break-word;
  color: ${colors.appPrimary};
  ${mediaQueries.md`
    font-size: 1.6rem;
    line-height: 1.3;
  `}
`;

export const AppHeaderNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-height: 100%;
  gap: ${spacings.sp4};
`;

export const AppHeaderItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const AppHeaderFlag = styled.img`
  width: 33px;
  height: 22px;
  cursor: pointer;
`;

export const PopOverContent = styled.div`
  padding: 3px 8px;
  top: 0px;
  border-radius: 6px;
  position: relative;
`;

const popOverItemCss = css`
  margin-top: 5px;
  width: 150px;
  margin: 0px;
  min-height: 27px;
  line-height: 28px;
  &:hover {
    background-color: aliceblue;
  }
  > svg {
    color: ${colors.appPrimary};
  }
`;

export const PopoverItem = styled(BaseText)`
  font-family: Roboto;
  font-size: ${fontSizes.ff8};
  cursor: pointer;
  font-weight: 600;
  ${popOverItemCss};
`;

export const StyledFlex = styled(Flex)`
  ${popOverItemCss};
  width: 100%;
`;
