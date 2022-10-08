/*
 *
 * Component: `PatientHistoryView`.
 *
 */
import { memo, useCallback } from "react";
import Flex from "@exsys-patient-insurance/flex";
import { colors } from "@exsys-patient-insurance/theme-values";
import Text from "@exsys-patient-insurance/text";
import AsyncAwaiter from "@exsys-patient-insurance/async-awaiter";
import PatientHistoryGlobalStyles from "./PatientHistoryGlobalStyles";
import {
  HistoryContainer,
  HistoryButton,
  HistoryInnerRenderer,
} from "../styled";
import { HistoryViewProps } from "../index.interface";

const PatientHistoryView = ({
  loading,
  noData,
  htmlString = "",
  current_doctor_only,
  current_specialty_only,
  getHistory,
  onOptionChanged,
  onToggle,
  fullscreen,
  noborder,
  noHistoryLabel,
  minHeight,
  maxHeight,
  isDrawerHistory,
  hideButtonOptions,
}: HistoryViewProps) => {
  const onChangeOptions = useCallback(
    (name: string) => () => {
      if (onOptionChanged) {
        onOptionChanged(name);
      }

      if (getHistory) {
        setTimeout(getHistory, 200);
      }
    },
    [getHistory, onOptionChanged]
  );

  return (
    <>
      <PatientHistoryGlobalStyles />
      <HistoryContainer
        className="patientHistoryContainer"
        fullscreen={fullscreen}
        noborder={noborder}
        minHeight={minHeight}
        maxHeight={maxHeight}
        isDrawerHistory={isDrawerHistory}
      >
        <Flex
          width="100%"
          height="35px"
          justify={noHistoryLabel ? "flex-start" : "space-between"}
          borderBottom
          align="center"
        >
          {!noHistoryLabel && (
            <Text children="vstshstry" color={colors.appPrimary} size="large" />
          )}

          {!hideButtonOptions && (
            <Flex align="center" justify="center">
              <HistoryButton
                children="curntdoconly"
                selected={current_doctor_only === "Y"}
                onClick={onChangeOptions("current_doctor_only")}
                minWidth="120px"
              />

              <HistoryButton
                children="curntspeconly"
                selected={current_specialty_only === "Y"}
                onClick={onChangeOptions("current_specialty_only")}
                minWidth="130px"
                marginend={onToggle ? "13px" : "4px"}
              />
            </Flex>
          )}
        </Flex>

        <AsyncAwaiter
          loading={loading}
          noData={noData}
          setWrapperAsColumn
          wrapperProps={{
            justify: "flex-start",
            align: loading || noData ? "center" : "flex-start",
          }}
        >
          <HistoryInnerRenderer
            className="patient-history"
            column="true"
            id="patient-history-wrapper"
            minHeight={minHeight}
            maxHeight={maxHeight}
            isDrawerHistory={isDrawerHistory}
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
        </AsyncAwaiter>
      </HistoryContainer>
    </>
  );
};

PatientHistoryView.defaultProps = {
  minHeight: "inherit",
  maxHeight: "inherit",
};

export default memo(PatientHistoryView);
