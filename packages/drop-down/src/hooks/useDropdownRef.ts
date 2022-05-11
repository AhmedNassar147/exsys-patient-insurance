/*
 *
 * Hook: `useDropdownRef`;
 *
 */
import { useCallback, useRef } from "react";
import { DropdownRefType, DropdownValuesForRefType } from "../index.interface";

const useDropdownRef = (): [DropdownRefType, DropdownValuesForRefType] => {
  const dropdownRef = useRef<DropdownValuesForRefType>();

  const openDropdown = useCallback(() => dropdownRef.current?.openDropdown(), [
    dropdownRef,
  ]);
  const closeDropdown = useCallback(
    () => dropdownRef.current?.closeDropdown(),
    [dropdownRef]
  );

  return [dropdownRef, { openDropdown, closeDropdown }];
};

export default useDropdownRef;
