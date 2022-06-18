/*
 *
 * Styled: `@exsys-patient-insurance/table-default-header-tools`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";

export const ToolsContainer = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  color: ${colors.appPrimary};
  border: 1px solid ${colors.gray1};
  height: 38px;
  border-radius: 2px;
  font-size: 22px;
  margin-bottom: 4px;
  > span {
    line-height: 0.5;
  }
`;
