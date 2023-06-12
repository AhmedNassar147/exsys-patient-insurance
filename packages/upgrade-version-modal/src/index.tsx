/*
 *
 * Package: `@exsys-patient-insurance/upgrade-version-modal`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@exsys-patient-insurance/modal";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { useInterval } from "@exsys-patient-insurance/hooks";
import useFormManager from "@exsys-patient-insurance/form-manager";
import { PageTitle } from "@exsys-patient-insurance/text";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import Flex from "@exsys-patient-insurance/flex";
import Button from "@exsys-patient-insurance/button";
import { useClearAppConfigState } from "@exsys-patient-insurance/app-config-store";
import { clearAllExsysStaffInStorage } from "@exsys-patient-insurance/helpers";
import transformAppVersionToNumber from "./transformAppVersionToNumber";
import {
  API_PARAMS,
  TIMER_MS,
  initialValues,
  latestProductionVersionNumber,
  TIMER_OF_15_MINS_MS,
} from "./constants";

const { web_version: defaultWebVersion } = initialValues;

const UpgradeVersionModal = () => {
  const clearAppConfigState = useClearAppConfigState();
  const navigate = useNavigate();

  const {
    values: { web_version, modalVisible, waiting15MinThenUpdateVersion },
    handleChange,
    handleChangeMultipleInputs,
  } = useFormManager({ initialValues });

  const { runQuery } = useBasicQuery({
    apiId: "QUERY_APP_VERSION",
    params: API_PARAMS,
    callOnFirstRender: false,
    disableParamsChangeCheck: true,
    excludeAuthorization: true,
    runQueryWhenLanguageChanged: false,
  });

  const openModalIfVersionsAreNotEqual = useCallback(
    (apiVersion: string) => {
      const apiAppVersionNumber = transformAppVersionToNumber(apiVersion);
      handleChange({
        name: "modalVisible",
        value: latestProductionVersionNumber !== apiAppVersionNumber,
      });
    },
    [handleChange]
  );

  const shouldCallVersionApi = !modalVisible && !waiting15MinThenUpdateVersion;

  const handleQuery = useCallback(
    () =>
      runQuery({}, ({ apiValues }) => {
        const { web_version } = apiValues;
        if (!web_version) {
          alert("checking app version didn't return `web_version`");
        }

        const apiAppVersion = web_version || defaultWebVersion;

        handleChangeMultipleInputs({
          web_version: apiAppVersion,
          waiting15MinThenUpdateVersion: false,
        });
        openModalIfVersionsAreNotEqual(apiAppVersion);
      }),
    [handleChangeMultipleInputs, openModalIfVersionsAreNotEqual, runQuery]
  );

  const handleClose = useCallback(
    () => handleChange({ name: "modalVisible", value: false }),
    [handleChange]
  );

  useInterval({
    shouldIntervalStart: shouldCallVersionApi,
    timer: TIMER_MS,
    action: handleQuery,
  });

  const handleLogout = useCallback(() => {
    clearAllExsysStaffInStorage(() => {
      clearAppConfigState();
      handleChange({ name: "waiting15MinThenUpdateVersion", value: false });
      navigate("/");
      setTimeout(() => window.location.reload(), 50);
    });
  }, [clearAppConfigState, handleChange, navigate]);

  useInterval({
    shouldIntervalStart: !!waiting15MinThenUpdateVersion,
    timer: TIMER_OF_15_MINS_MS,
    action: handleLogout,
  });

  const handleLogoutAfterTimeOrContinue = useCallback(() => {
    if (!waiting15MinThenUpdateVersion) {
      handleClose();
      handleChange({ name: "waiting15MinThenUpdateVersion", value: true });
    }
  }, [handleChange, handleClose, waiting15MinThenUpdateVersion]);

  const shouldUpgrade = useMemo(
    () =>
      transformAppVersionToNumber(web_version) > latestProductionVersionNumber,
    [web_version]
  );

  const upgradeOrDowngradeLabel = shouldUpgrade ? "upgrade" : "downgrade";
  const modalTitle = `${upgradeOrDowngradeLabel} app version using (shift + ctrl + r)`;

  return (
    <Modal
      visible={modalVisible}
      onClose={handleClose}
      title={modalTitle}
      maskClosable={false}
      closable={false}
      onlyAllowCloseActionWhenNotClosable
      noFooter
      width="430px"
    >
      <Flex
        wrap="true"
        align="center"
        width="100%"
        padding="0px 0 5px"
        gap="16px"
        justify="center"
      >
        <PageTitle
          width="100%"
          margin="0"
          center
          children={`Please ${modalTitle}`}
        />
        <LabeledViewLikeInput
          label="loaded app version"
          width="45%"
          value={defaultWebVersion}
        />
        <LabeledViewLikeInput
          label="new app version"
          width="45%"
          value={web_version}
        />
        <Button
          onClick={handleLogout}
          type="primary"
          label={`logout to ${upgradeOrDowngradeLabel}`}
        />
        <Button
          onClick={handleLogoutAfterTimeOrContinue}
          type="primary"
          label={`${upgradeOrDowngradeLabel} after 15 mins`}
        />
      </Flex>
    </Modal>
  );
};

export default memo(UpgradeVersionModal);
