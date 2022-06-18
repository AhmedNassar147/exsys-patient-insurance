/*
 *
 * Package: `@exsys-patient-insurance/input-number`.
 *
 */
import { memo, useCallback, useState } from "react";
import InputField, {
  INPUT_FIELD_DEFAULT_PROPS,
} from "@exsys-patient-insurance/input-field";
import Flex from "@exsys-patient-insurance/flex";
import { onChangeEvent } from "@exsys-patient-insurance/types";
import ArrowView from "./partials/ArrowView";
import InputNumberFieldProps, { CounterActionTypes } from "./index.interface";

const ADD_ON_AFTER_WIDTH = "18px";
const INPUT_STATE_INIT = "INIT";

const InputNumber = ({
  onChange,
  step,
  name,
  value,
  min,
  max,
  disabled,
  formatShape,
  formatBeforeValue,
  ...props
}: InputNumberFieldProps) => {
  const [internalInputValue, setInternalInputValue] = useState<string | number>(
    INPUT_STATE_INIT
  );

  const isInitialInputState = internalInputValue === INPUT_STATE_INIT;
  const whichValue = isInitialInputState ? value : internalInputValue;
  const finalStep = typeof step === "undefined" ? 1 : step;

  const validateNextValueByMinMax = useCallback(
    (value?: number) => {
      const hasMinDefined = typeof min === "number";
      const hasMaxDefined = typeof max === "number";

      if (hasMinDefined || hasMaxDefined) {
        // note: this will be fixed when we upgrade to next ts.
        // @ts-ignore we already done the check above.
        if (value < min) {
          return min;
        }
        // note: this will be fixed when we upgrade to next ts.
        // @ts-ignore we already done the check above.
        if (value > max) {
          return max;
        }

        return value;
      }

      return value;
    },
    [min, max]
  );

  const handleChange: onChangeEvent = useCallback(
    (event) => {
      const { value: eventValue } = event;
      const eventValueString = `${eventValue}`;
      const maybeValidValue = eventValueString.replace(/[^0-9|.]/g, "");

      setInternalInputValue(maybeValidValue);

      onChange?.({
        name: name || "",
        value: /[1-9]\.$|[1-9]\.0{0,8}$/.test(maybeValidValue)
          ? maybeValidValue
          : +maybeValidValue,
      });
    },
    [name, onChange]
  );

  const flushInputValue = useCallback(
    (inputValue?: number) => {
      const validValue = validateNextValueByMinMax(inputValue);

      onChange?.({
        name: name || "",
        value: validValue,
      });
    },
    [name, onChange, validateNextValueByMinMax]
  );

  const onBlur = useCallback(() => {
    if (internalInputValue === INPUT_STATE_INIT) {
      return;
    }

    const validatedValueNumber = isNaN(internalInputValue as number)
      ? undefined
      : +(internalInputValue as number);

    flushInputValue(validatedValueNumber);
    setInternalInputValue(() => INPUT_STATE_INIT);
  }, [internalInputValue, flushInputValue]);

  const setCounter = useCallback(
    (actionType: CounterActionTypes) => {
      const shouldIncrease = actionType === "increase";
      let nextValue = value || 0;

      nextValue = shouldIncrease
        ? nextValue + finalStep
        : nextValue - finalStep;

      flushInputValue(nextValue);
    },
    [finalStep, value, flushInputValue]
  );

  const handleKeyDown = useCallback(
    (domEvent: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      const { key } = domEvent;
      const shouldIncrease = key === "ArrowUp";
      const shouldDecrease = key === "ArrowDown";

      if (shouldIncrease || shouldDecrease) {
        domEvent.preventDefault();
        setCounter(shouldIncrease ? "increase" : "decrease");

        return;
      }

      if (key === "Backspace") {
        domEvent.preventDefault();

        let baseValue = whichValue || "";

        if (baseValue) {
          let nextValue = [...baseValue.toString()];
          nextValue.pop();

          baseValue = nextValue?.join?.("");
        }

        if (baseValue !== whichValue) {
          setInternalInputValue(() => INPUT_STATE_INIT);
          onChange?.({
            name: name || "",
            value: baseValue ? +baseValue || undefined : undefined,
          });
        }
      }
    },
    [disabled, setCounter, whichValue, onChange, name]
  );

  const setLazyCounter = useCallback(
    (type: CounterActionTypes) => () => setCounter(type),
    [setCounter]
  );

  const renderAddOnAfter = useCallback(
    () => (
      <Flex
        column="true"
        height="100%"
        width={ADD_ON_AFTER_WIDTH}
        align="center"
      >
        <ArrowView
          disabled={disabled}
          onClick={setLazyCounter("increase")}
          direction="up"
        />

        <ArrowView
          disabled={disabled}
          onClick={setLazyCounter("decrease")}
          direction="down"
        />
      </Flex>
    ),
    [setLazyCounter, disabled]
  );

  let finalInputValue: string | number | undefined = whichValue;

  if (value && formatShape) {
    let valueWithFormatter =
      value && formatShape ? [value, formatShape] : [value];
    finalInputValue = formatBeforeValue
      ? valueWithFormatter.reverse().join("")
      : valueWithFormatter.join("");
  }

  return (
    <InputField
      {...props}
      disabled={disabled}
      name={name}
      value={finalInputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      type="text"
      autoComplete="off"
      max={max}
      step={step}
      addonAfter={renderAddOnAfter()}
      addonAfterWidth={ADD_ON_AFTER_WIDTH}
    />
  );
};
InputNumber.defaultProps = INPUT_FIELD_DEFAULT_PROPS;

export default memo(InputNumber);
