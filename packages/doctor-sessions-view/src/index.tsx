/*
 *
 * Package: `@exsys-clinio/doctor-sessions-view`.
 *
 */
import { memo, useState, useCallback, Suspense, lazy } from "react";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import Button from "@exsys-clinio/button";
import ArrowIcon from "@exsys-clinio/arrow-icon";
import type {
  OnResponseActionType,
  RecordType,
  RecordTypeWithAnyValue,
} from "@exsys-clinio/types";
import {
  MainSessionsWrapper,
  SessionsWrapper,
  SessionsPaginationWrapper,
} from "./styled";
import { SessionViewProps, BaseSessionViewProps } from "./index.interface";

const SessionView = lazy(
  () =>
    import(
      "./partials/SessionView" /* webpackChunkName: "exsys-clinio.doctor-sessions-view.SessionView" */
    )
);

interface DoctorSessionsViewProps extends BaseSessionViewProps {
  periodType: string;
  clinicalEntityNo: number;
  sessionCode?: number;
}

const skipQuery = ({
  clinical_entity_no,
  period_type,
}: RecordTypeWithAnyValue) => !clinical_entity_no || !period_type;

const DoctorSessionsView = ({
  periodType,
  clinicalEntityNo,
  sessionCode,
  doctorImageUrl,
  clinicalName,
}: DoctorSessionsViewProps) => {
  const [{ pageNumber, sessions }, setSessionsData] = useState({
    pageNumber: 0,
    sessions: [] as SessionViewProps[],
  });

  const handleResponse: OnResponseActionType<RecordType<SessionViewProps[]>> =
    useCallback(({ apiValues, error }) => {
      const { data } = apiValues || {};
      setSessionsData((previous) => ({
        ...previous,
        sessions: !!error || !data ? [] : data,
      }));
    }, []);

  const { loading, runQuery } = useBasicQuery({
    apiId: "QUERY_SESSIONS_BY_CLINICAL_ENTITY_NO",
    skipQuery,
    onResponse: handleResponse,
    params: {
      clinical_entity_no: clinicalEntityNo,
      period_type: periodType,
      poffset: pageNumber * 4,
      session_code: sessionCode,
      slotsPerOffset: 4,
    },
  });

  const handleArrowAction = useCallback(
    (type: "previous" | "next") => () => {
      setSessionsData(({ pageNumber, ...previous }) => ({
        ...previous,
        pageNumber: type === "next" ? pageNumber + 1 : pageNumber - 1,
      }));
    },
    []
  );

  const sessionsLength = sessions?.length ?? 0;
  const hasSessions = !!sessionsLength;

  const nextButtonDisabled = sessionsLength < 4;

  const onBookingDoneSuccessfully = useCallback(() => {
    runQuery();
  }, [runQuery]);

  return (
    <Suspense fallback={null}>
      <MainSessionsWrapper>
        <SessionsWrapper>
          {hasSessions &&
            sessions?.map((item) => (
              <SessionView
                key={item.date}
                {...item}
                doctorImageUrl={doctorImageUrl}
                clinicalName={clinicalName}
                onBookingDoneSuccessfully={onBookingDoneSuccessfully}
              />
            ))}
        </SessionsWrapper>
        {periodType === "N" && (
          <SessionsPaginationWrapper>
            <Button
              icon={<ArrowIcon direction="left" color="currentcolor" />}
              shape="circle"
              type="primary"
              disabled={!pageNumber || loading}
              onClick={handleArrowAction("previous")}
              loading={loading}
            />
            <Button
              icon={<ArrowIcon direction="right" color="currentcolor" />}
              shape="circle"
              type="primary"
              loading={loading}
              disabled={nextButtonDisabled || loading}
              onClick={handleArrowAction("next")}
            />
          </SessionsPaginationWrapper>
        )}
      </MainSessionsWrapper>
    </Suspense>
  );
};

export default memo(DoctorSessionsView);
