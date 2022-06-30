/*
 *
 * Package: `@exsys-patient-insurance/search-clear-icons`.
 *
 */
import { memo } from "react";
import ClearIcon from "@exsys-patient-insurance/clear-icon";
import SearchIcon from "@exsys-patient-insurance/search-icon";
import Button from "@exsys-patient-insurance/button";

type SearchClearIconsProps = {
  disabled?: boolean;
  loading?: boolean;
  onPressSearch?: () => void;
  onPressClear?: () => void;
  noClearIcon?: boolean;
  noSearchIcon?: boolean;
  searchLabel?: string;
  searchIconPlaceholder?: React.ElementType;
};

export const ICON_PROPS = Object.freeze({
  width: "1.3em",
  height: "1.3em",
});

const SearchClearIcons = ({
  disabled,
  loading,
  onPressSearch,
  onPressClear,
  noClearIcon,
  noSearchIcon,
  searchLabel,
  searchIconPlaceholder,
}: SearchClearIconsProps) => {
  const FirstIcon = searchIconPlaceholder || SearchIcon;

  return (
    <>
      {!noSearchIcon && (
        <Button
          type="primary"
          loading={loading}
          icon={<FirstIcon {...ICON_PROPS} />}
          onClick={onPressSearch}
          disabled={disabled}
          label={searchLabel}
          padding="0 8px"
        />
      )}

      {!noClearIcon && (
        <Button
          type="primary"
          onClick={onPressClear}
          icon={<ClearIcon {...ICON_PROPS} />}
          disabled={disabled}
          padding="0 8px"
        />
      )}
    </>
  );
};
SearchClearIcons.defaultProps = {
  searchLabel: "srch",
};

export default memo(SearchClearIcons);
