/*
 *
 * Package: `@exsys-patient-insurance/select-with-add-action`.
 *
 */
import { memo } from "react";
import BaseSelectWithAddAction from "./partials/BaseSelectWithAddAction";
import useClientCodeQueryAndMutation, {
  UseClientCodeQueryOptions,
} from "./hooks/useClientCodeQueryAndMutation";
import { SelectWithAddActionProps } from "./index.interface";

type IProps = UseClientCodeQueryOptions &
  Omit<SelectWithAddActionProps, "onAddItem" | "dataOptions">;

const SelectWithAddActionAndQuery = ({
  callOnFirstRender = true,
  runQueryWhenLanguageChanged = true,
  withLanguageParam = true,
  debounceRequestTimeOutMS = 400,
  codeId,
  enableNetworkCache,
  checkAllParamsValuesToQuery,
  skipQuery,
  params,
  disableParamsChangeCheck,
  allowedParamsWithEmptyValue,
  onNewItemAdded,
  disabled,
  loading,
  ...resetProps
}: IProps) => {
  const clientCodeOptions = useClientCodeQueryAndMutation({
    codeId: codeId,
    callOnFirstRender,
    runQueryWhenLanguageChanged,
    enableNetworkCache,
    checkAllParamsValuesToQuery,
    withLanguageParam,
    skipQuery,
    params,
    disableParamsChangeCheck,
    allowedParamsWithEmptyValue,
    onNewItemAdded,
    debounceRequestTimeOutMS,
  });

  const {
    handleAddNewCodeItem,
    postCodeNewItemLoading,
    queryLoading,
    clientOptionsData,
  } = clientCodeOptions;

  const actualLoading = loading || queryLoading || postCodeNewItemLoading;

  return (
    <BaseSelectWithAddAction
      {...resetProps}
      disabled={disabled || actualLoading}
      dataOptions={clientOptionsData}
      loading={actualLoading}
      onAddItem={handleAddNewCodeItem}
    />
  );
};

export default memo(SelectWithAddActionAndQuery);

export { DEFAULT_CLIENT_SELECT_DATA_OPTIONS } from "./constants";
