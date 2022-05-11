/*
 *
 * Constant: `@exsys-clinio/input-field`.
 *
 */
export const INTERNAL_INPUT_FIELD_SIZES = Object.freeze({
  default: "30px",
  small: "24px",
  large: "37px",
} as const);

export const INPUT_FIELD_SIZES = Object.freeze({
  ...INTERNAL_INPUT_FIELD_SIZES,
  auto: "auto",
} as const);

export const INPUT_FIELD_TYPES = Object.freeze({
  text: "text",
  search: "search",
  password: "password",
} as const);

export const INPUT_FIELD_DEFAULT_PROPS = Object.freeze({
  size: "default",
  type: INPUT_FIELD_TYPES.text,
  margin: "0px",
  tabIndex: 1,
  dir: "auto",
  width: "100%",
  useTooltip: false,
  useErrorHint: true,
  useRedBorderWhenError: true,
  labelmarginstart: "8px",
  fontWeight: "inherit",
  addonAfterWidth: "22px",
  internalInputHeight: "100%",
} as const);
