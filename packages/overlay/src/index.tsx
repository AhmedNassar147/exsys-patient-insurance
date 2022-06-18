/*
 *
 * Package: `@exsys-patient-insurance/overlay`.
 *
 */
import styled from "styled-components";
import { colors, zIndices } from "@exsys-patient-insurance/theme-values";
import LoadingIcon from "@exsys-patient-insurance/loading-icon";

const { disabledBg, extraPrimary } = colors;

interface OverlyProps {
  visible?: boolean;
  className?: string;
}

const Overlay = styled.div<OverlyProps>`
  ${(props) => `
    opacity: ${props.visible ? 0.8 : 0};
    visibility: ${props.visible ? "visible" : "hidden"};
    background-color: ${disabledBg}
  `};
  display: flex;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: ${zIndices.loaderFallback};
  transition: opacity 0.3s ease-in-out;
`;
Overlay.defaultProps = {
  children: <LoadingIcon width="2em" height="2em" color={extraPrimary} />,
};

export default Overlay;
