/*
 *
 * Hook: `useTimeState`.
 *
 */
import { useState, useCallback, useEffect, useMemo } from "react";
import { useMakeSelectCurrentLanguageId } from "@exsys-patient-insurance/app-config-store";
import { getDateTime, getCurrentDate } from "../helpers/getDateTime";

const useTimeState = () => {
  const language_id = useMakeSelectCurrentLanguageId();

  const currentTime = useMemo(() => getDateTime(language_id), [language_id]);

  const [time, updateHandler] = useState(currentTime);

  const tick = useCallback(
    () => updateHandler(getDateTime(language_id)),
    [updateHandler, language_id]
  );

  const currentDate = useMemo(() => getCurrentDate(language_id), [language_id]);

  useEffect(() => {
    const intervalID = setInterval(tick, 1000);
    // willUnmount
    return () => clearInterval(intervalID);
  }, [time, tick]);

  return {
    time,
    currentDate,
  };
};

export default useTimeState;
