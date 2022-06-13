/*
 *
 * `useCodeQuery`: `@exsys-patient-insurance/network-hooks`.
 *
 */
import { CODES_IDS } from "@exsys-patient-insurance/api-constants";
import { isObjectHasKey } from "@exsys-patient-insurance/helpers";
import {
  SelectListProps,
  UseCodeQueryOptions,
} from "@exsys-patient-insurance/types";
import useBasicQuery from "./useBasicQuery";

type IResultType = SelectListProps[];

const useCodeQuery = ({
  type,
  codeId,
  params,
  ...restOptions
}: UseCodeQueryOptions) => {
  params = params || {};

  if (isObjectHasKey(params, "pwhere")) {
    const pwhereParam = params.pwhere;
    params = {
      ...params,
      pwhere: `and user_code in${pwhereParam}`,
    };
  }

  return useBasicQuery<IResultType>({
    apiId: type === "code" ? "CODE_LIST" : "U_CODE_LIST",
    params: {
      pcodetype: CODES_IDS[codeId],
      ...params,
    },
    transformApiDataFn: (data) => data.data as IResultType,
    ...restOptions,
  });
};

export default useCodeQuery;
