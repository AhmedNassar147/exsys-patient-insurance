/*
 *
 * Hook: `useCreateChangeEventFromDomInput`.
 *
 */
import { useCallback, ChangeEvent, KeyboardEvent } from "react";
import { createRegexpFromValueString } from "@exsys-patient-insurance/helpers";
import { onChangeEvent, StringNumber } from "@exsys-patient-insurance/types";

type BaseOptions = {
  autoCapitalize?: boolean;
  valueMatchPattern?: string;
  upperCaseFirstCharacter?: boolean;
};

type ConfigProps = BaseOptions & {
  onChange?: onChangeEvent;
  onPressEnter?: onChangeEvent;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

type GetEventPropsOptions = BaseOptions & {
  event: ChangeEvent<HTMLInputElement>;
};

const getEventProps = ({
  event,
  autoCapitalize,
  valueMatchPattern,
  upperCaseFirstCharacter,
}: GetEventPropsOptions) => {
  const {
    target: { name, value },
  } = event;
  let nextValue: StringNumber = value;

  if (autoCapitalize && typeof value === "string") {
    nextValue = (value || "").toUpperCase();
  }

  if (upperCaseFirstCharacter && typeof value === "string") {
    const baseValue = value || "";
    nextValue = baseValue.charAt(0).toUpperCase() + baseValue.slice(1);
  }

  if (valueMatchPattern) {
    const maybeValidRegex = createRegexpFromValueString(valueMatchPattern);
    if (maybeValidRegex) {
      const match = nextValue.match(maybeValidRegex) || [];
      nextValue = match.join("");
    }
  }
  return {
    name,
    value: nextValue,
  };
};

const useCreateChangeEventFromDomInput = ({
  onChange,
  onPressEnter,
  onKeyDown,
  autoCapitalize,
  valueMatchPattern,
  upperCaseFirstCharacter,
}: ConfigProps) => {
  const handleEventChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(
        getEventProps({
          event,
          autoCapitalize,
          valueMatchPattern,
          upperCaseFirstCharacter,
        })
      );
    },
    [onChange, autoCapitalize, valueMatchPattern, upperCaseFirstCharacter]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.key === "Enter") {
        onPressEnter?.(
          getEventProps({
            // @ts-ignore ignore react misleading keyboard event
            event,
            autoCapitalize,
            valueMatchPattern,
            upperCaseFirstCharacter,
          })
        );
      }
    },
    [
      onKeyDown,
      onPressEnter,
      autoCapitalize,
      valueMatchPattern,
      upperCaseFirstCharacter,
    ]
  );

  return { handleEventChange, handleKeyDown };
};

export default useCreateChangeEventFromDomInput;
