/*
 *
 * Hook: `useLoginRequest`.
 *
 */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAuthConfigData } from "@exsys-patient-insurance/app-config-store";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { SubmitHandlerType } from "@exsys-patient-insurance/form-manager";
import { normalizeAppStoreLanguageAndDir } from "@exsys-patient-insurance/helpers";
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import { LoginFormState } from "../index.interface";

const FIELDS_ERROR = `wrong userName or Password`;

type LoginResponseType = Omit<AppConfigStateType, "isRightToLeft"> & {
  login: string;
};

const useLoginRequest = () => {
  const setAppConfigStoreData = useSetAuthConfigData();
  const navigate = useNavigate();

  // @TODO: we need to transform this to `useBasicMutation`
  const { loading, runQuery } = useBasicQuery<LoginResponseType>({
    apiId: "MAKE_LOGIN",
    callOnFirstRender: false,
    excludeAuthorization: true,
    runQueryWhenLanguageChanged: false,
  });

  const requestUserLogin: SubmitHandlerType<LoginFormState> = useCallback(
    async ({ username, password }, { setErrors }) => {
      const params = {
        username,
        password,
        location: "my_ip",
      };

      await runQuery(params, ({ apiValues: data, error, status }) => {
        const { login, ...otherLoginValues } = data;

        const isError = status !== 200 || error || login !== "success";

        if (isError) {
          setErrors((previous) => ({
            ...previous,
            username: error || FIELDS_ERROR,
          }));
          return;
        }

        const { language_id } = otherLoginValues;
        const { normalizedData, nextDir } =
          normalizeAppStoreLanguageAndDir(language_id);

        const { privileges } = otherLoginValues;
        const [firstKey] = Object.keys(privileges);
        const homePageUrl = `/${firstKey}`;

        const newUserData = {
          ...otherLoginValues,
          ...normalizedData,
          homePageUrl,
        };

        setAppConfigStoreData(newUserData);
        document.body.setAttribute("dir", nextDir);
        navigate(homePageUrl);
      });
    },
    [runQuery, navigate, setAppConfigStoreData]
  );

  return {
    loading,
    requestUserLogin,
  };
};

export default useLoginRequest;
