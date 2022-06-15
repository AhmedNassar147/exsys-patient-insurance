import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { BaseText } from "@exsys-patient-insurance/text";
import imageUrl from "./assets/main.jpg";

export const LoginContainer = styled.div`
  min-height: inherit;
  max-height: inherit;
  overflow: hidden;
  background-color: ${colors.white};
  background: url(${imageUrl}) center center no-repeat;
  width: 100%;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 10.5px 18.2px 39.6px 6.4px rgba(17, 81, 125, 0.15);
  box-sizing: border-box;
  padding: 108px 142px 0px;
`;

export const Text = styled(BaseText)`
  margin-top: 12px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.17;
`;

export const FormContainer = styled.form`
  margin: 12px 0;
  width: 350px;
  display: flex;
  gap: 13px;
  flex-direction: column;
`;

export const ClientLogoImg = styled.img`
  width: 405px;
  height: 244px;
  object-fit: contain;
  margin-inline-start: 143px;
`;
