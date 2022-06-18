/*
 *
 * Component: `SearchDropDown`;
 *
 */
import { useMemo, memo } from "react";
import Flex from "@exsys-patient-insurance/flex";
import InputField from "@exsys-patient-insurance/input-field";
import SearchIcon from "@exsys-patient-insurance/search-icon";
import Button from "@exsys-patient-insurance/button";
import { StyledDropdown } from "../styled";
import { TableHeadSearchDropDownProps } from "../index.interface";

const SearchDropDown = ({
  searchValue,
  dataIndex,
  onChange,
  onActionFired,
}: TableHeadSearchDropDownProps) => {
  const searchIcon = useMemo(
    () => <SearchIcon width="0.9em" height="0.9em" />,
    []
  );

  return (
    <StyledDropdown
      trigger={searchIcon}
      triggerWidth="1.1em"
      menuWidth="200px"
      usePortal
    >
      <Flex
        gap="8px"
        width="100%"
        align="center"
        padding="6px"
        wrap="true"
        justify="center"
      >
        <InputField
          width="100%"
          value={searchValue}
          name={dataIndex}
          onChange={onChange}
          onPressEnter={onActionFired("search")}
          autoComplete="off"
          height="28px"
          fontWeight="normal"
          autoFocus
          tabIndex={2}
        />

        <Button
          type="primary"
          onClick={onActionFired("search")}
          icon={searchIcon}
          size="small"
          label="srch"
        />

        <Button label="reset" size="small" onClick={onActionFired("reset")} />
      </Flex>
    </StyledDropdown>
  );
};

export default memo(SearchDropDown);
