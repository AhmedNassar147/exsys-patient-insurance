/*
 *
 * Hook: `useMenuItemsScrollControllers`.
 *
 */
import { useCallback } from "react";

const useMenuItemsScrollControllers = (
  menuItemsRef: React.RefObject<HTMLUListElement | undefined>,
  shouldRegisterKeyDown: boolean
) => {
  const handleKeyDown = useCallback(
    ({ key }: React.KeyboardEvent<HTMLUListElement> | KeyboardEvent) => {
      const keys = ["ArrowDown", "ArrowUp"];

      const { current: menuCurrentRef } = menuItemsRef;

      if (menuCurrentRef && keys.includes(key)) {
        const { scrollTop, childNodes } = menuCurrentRef;

        const [firstChild] = childNodes || [];
        const listItemHeight = (firstChild as HTMLLIElement)?.clientHeight || 0;

        const [downKeyName] = keys;
        const isDownKey = downKeyName === key;

        const nextYScrollValue = isDownKey
          ? scrollTop + listItemHeight
          : scrollTop - listItemHeight;

        if (nextYScrollValue > 0) {
          menuCurrentRef?.scrollTo(0, nextYScrollValue);
        }
      }
    },
    [menuItemsRef]
  );

  const registerKeyDownScroll = useCallback(() => {
    if (shouldRegisterKeyDown) {
      document.addEventListener("keydown", handleKeyDown, true);
    }
  }, [handleKeyDown, shouldRegisterKeyDown]);

  const unRegisterKeyDownScroll = useCallback(() => {
    if (shouldRegisterKeyDown) {
      document.removeEventListener("keydown", handleKeyDown, true);
    }
  }, [handleKeyDown, shouldRegisterKeyDown]);

  return {
    unRegisterKeyDownScroll,
    registerKeyDownScroll,
  };
};

export default useMenuItemsScrollControllers;
