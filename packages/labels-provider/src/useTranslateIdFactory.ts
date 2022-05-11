/*
 *
 * `useTranslateIdFactory`: `@exsys-clinio/labels-provider`.
 *
 */
import { useCallback } from "react";
import { translateLabelId } from "@exsys-clinio/helpers";
import usePageLabelsContext from "./usePageLabelsContext";

/**
 * @examples
 *  labelId = "name" => my name .
 *  labelId = "__t__name is ahmed" => my name is ahmed .
 */
const useTranslateIdFactory = () => {
  const labels = usePageLabelsContext();

  const translateLabel = useCallback(
    (labelId: string) => translateLabelId(labels, labelId),
    [labels]
  );

  return translateLabel;
};

export default useTranslateIdFactory;
