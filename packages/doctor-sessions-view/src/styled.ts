/*
 *
 * Styled: `@exsys-clinio/doctor-sessions-view`.
 *
 */
import styled from "styled-components";
import { colors, spacings } from "@exsys-clinio/theme-values";
import Flex from "@exsys-clinio/flex";
import Text from "@exsys-clinio/text";
import mediaQueries from "@exsys-clinio/media-queries";
import {
  customScrollbar,
  flexCenteredRowCss,
} from "@exsys-clinio/styled-helpers";

export const SessionViewWrapper = styled.div`
  border: 1px solid ${colors.inputBorderColor};
  padding: ${spacings.sp2};
  border-radius: ${spacings.sp2};
  width: calc(100% / 4);
  ${mediaQueries.sm`
    width: ${spacings.sp16};
  `};
  &:not(:last-child) {
    margin-inline-end: ${spacings.sp4};
  }
`;

export const AppointmentsWrapper = styled(Flex)`
  flex-direction: column;
  border-top: 1px solid ${colors.inputBorderColor};
  padding-top: ${spacings.sp3};
  margin-top: ${spacings.sp2};
  overflow-y: auto;
  min-height: ${spacings.sp22};
  max-height: ${spacings.sp22};
  gap: ${spacings.sp2};
  ${customScrollbar};
`;

export const BookingTimeItem = styled(Text)`
  text-align: center;
  color: ${colors.appPrimary};
  padding: ${spacings.sp1};
  font-weight: 400;
  word-break: break-word;
  &:hover {
    background-color: ${colors.appPrimary};
    color: ${colors.white};
    border-radius: ${spacings.sp2};
    cursor: pointer;
    transition: all 0.2s ease;
  }
`;

export const MainSessionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${spacings.sp4};
  grid-column: span 2 / auto;
  ${mediaQueries.lg`
    width: unset;
    grid-column: unset;
  `};
`;

export const SessionsPaginationWrapper = styled.div`
  ${flexCenteredRowCss}
  gap: ${spacings.sp4};
  width: 100%;
`;

export const SessionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${mediaQueries.lg`
    justify-content: flex-start;
  `};
`;
