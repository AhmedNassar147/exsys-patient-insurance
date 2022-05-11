/*
 *
 * Package: `@exsys-clinio/doctor-sessions-view`.
 *
 */
import {
  memo,
  useState,
  useCallback,
  Suspense,
  lazy,
  useLayoutEffect,
} from "react";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import { getItemFromStorage, setItemToStorage } from "@exsys-clinio/helpers";
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
import { SessionViewProps } from "./index.interface";

const SessionView = lazy(
  () =>
    import(
      "./partials/SessionView" /* webpackChunkName: "exsys-clinio.doctor-sessions-view.SessionView" */
    )
);

interface DoctorSessionsViewProps {
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
}: DoctorSessionsViewProps) => {
  const [{ pageNumber, sessions }, setSessionsData] = useState({
    pageNumber: 0,
    sessions: [] as SessionViewProps[],
  });

  useLayoutEffect(() => {
    const lastSessionsPaginationData = getItemFromStorage<{
      pageNumber: number;
    }>("lastSessionsPaginationData");

    if (lastSessionsPaginationData) {
      setSessionsData((previous) => ({
        ...previous,
        ...lastSessionsPaginationData,
      }));
    }
  }, []);

  const handleResponse: OnResponseActionType<RecordType<SessionViewProps[]>> =
    useCallback(({ apiValues, error }) => {
      const { data } = apiValues || {};
      setSessionsData((previous) => ({
        ...previous,
        sessions: !!error || !data ? [] : data,
      }));
    }, []);

  const { loading } = useBasicQuery({
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
      setSessionsData(({ pageNumber, ...previous }) => {
        const nextPageNumber =
          type === "next" ? pageNumber + 1 : pageNumber - 1;

        setItemToStorage("lastSessionsPaginationData", {
          pageNumber: nextPageNumber,
        });

        return {
          ...previous,
          pageNumber: nextPageNumber,
        };
      });
    },
    []
  );

  const hasSessions = !!sessions?.length;

  return (
    <Suspense fallback={null}>
      <MainSessionsWrapper>
        <SessionsWrapper>
          {!loading &&
            hasSessions &&
            sessions?.map((item) => <SessionView key={item.date} {...item} />)}
        </SessionsWrapper>
        {hasSessions && (
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
              disabled={!hasSessions || loading}
              onClick={handleArrowAction("next")}
            />
          </SessionsPaginationWrapper>
        )}
      </MainSessionsWrapper>
    </Suspense>
  );
};

export default memo(DoctorSessionsView);
