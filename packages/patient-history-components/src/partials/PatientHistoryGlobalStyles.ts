/*
 *
 * Component: `PatientHistoryGlobalStyles`.
 *
 */
import { createGlobalStyle } from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";

const PatientHistoryGlobalStyles = createGlobalStyle`
.patient-history {
  width: 100%;
  margin-top: 1em;
  font-size: 12px;
  line-height: 1;

> th,td {
    border: 0px !important;
    border-style: unset !important;
    padding: 0.16em;
  };
}

.patient-history .red {
  color: red;
}

.patient-history > .header {
  color: red;
  font-size: 2.4em;
  font-weight: 600;
}

.patient-history .smaller {
  font-size: 1em;
}

.patient-history .small {
  font-size: 1.5em !important;
}

.patient-history .medium {
  font-size: 1.6em;
}

.patient-history .large {
  font-size: 2em;
}

.patient-history .underline {
  text-decoration: underline;
}

.patient-history .blue {
  color: ${colors.appPrimary};
}

.patient-history .green {
  color: ${colors.orange3};
}

.patient-history > .bold {
  font-weight: 600;
}

.patient-history > .alignSelfEnd {
  align-self: flex-end;
}

.patient-history > .indent45 {
  text-indent: 4.5em;
}

.patient-history > p {
  margin-bottom: 0.3em;
}

.patient-history > table {
  border: 0px;
  text-align: center;
}

.patient-history > table {
  border-collapse: collapse;
}

.patient-history > table > thead {
  background-color: ${colors.appPrimary};
  color: ${colors.white} !important;
}

.patient-history > .flex {
  display: flex;
}
.patient-history > .row {
  flex-direction: row;
}
.patient-history > .spacebetween {
  justify-content: space-between;
}

.patient-history > .consult-btn {
  background-color: ${colors.extraPrimary};
  min-width: 8.5em;
  border-radius: 3px;
  height: 1.4em;
  line-height: 1;
  color: ${colors.white};
  padding: 4px;
  text-align: center;
};

.patient-history .exsys-server-tooltip-trigger {
  cursor: pointer;
  &:hover {
    > .exsys-server-tooltip-content {
     visibility: visible !important;
    }
  }
};

`;

export default PatientHistoryGlobalStyles;
