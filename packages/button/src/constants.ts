/*
 *
 * Constants: `@exsys-clinio/button`.
 *
 */
import { fontSizes, colors } from "@exsys-clinio/theme-values";

export const DEFAULT_PROPS = Object.freeze({
  htmlType: "button",
  width: "auto",
  margin: "0",
});

export const BUTTON_SIZES = Object.freeze({
  DEFAULT: "default",
  SMALL: "small",
  LARGE: "large",
} as const);

export const BUTTON_SHAPES = Object.freeze({
  CIRCLE: "circle",
  ROUND: "round",
} as const);

export const BUTTON_SIZE_STYLES = Object.freeze({
  [BUTTON_SIZES.DEFAULT]: {
    height: "30px",
    padding: "0 12px",
    fontSize: fontSizes.ff8,
  },
  [BUTTON_SIZES.SMALL]: {
    height: "24px",
    padding: "0 7px",
    fontSize: fontSizes.ff8,
  },
  [BUTTON_SIZES.LARGE]: {
    height: "40px",
    padding: "0 12px",
    fontSize: fontSizes.ff7,
  },
});

export const BUTTON_TYPES = Object.freeze({
  DEFAULT: "default",
  PRIMARY: "primary",
  DANGER: "danger",
  DASHED: "dashed",
  LINK: "link",
} as const);

const PRIMARY_BORDER = `1px solid ${colors.appPrimary}`;
const DANGER_BORDER = `1px solid ${colors.red}`;

const DEFAULT_STYLE = Object.freeze({
  color: colors.inputLabelColor,
  backgroundColor: colors.white,
  border: `1px solid ${colors.inputBorderColor}`,
  hoverBorder: `1px solid ${colors.appPrimary}`,
  hoverColor: colors.appPrimary,
  ghostColor: colors.appPrimary,
});

export const BUTTON_TYPE_STYLES = Object.freeze({
  [BUTTON_TYPES.DEFAULT]: DEFAULT_STYLE,
  [BUTTON_TYPES.PRIMARY]: {
    color: colors.white,
    backgroundColor: colors.appPrimary,
    border: PRIMARY_BORDER,
    hoverBorder: PRIMARY_BORDER,
    hoverColor: colors.white,
    ghostColor: colors.appPrimary,
  },
  [BUTTON_TYPES.DANGER]: {
    color: colors.white,
    backgroundColor: colors.red,
    border: DANGER_BORDER,
    hoverBorder: DANGER_BORDER,
    hoverColor: colors.white,
    ghostColor: colors.red,
  },
  [BUTTON_TYPES.DASHED]: {
    ...DEFAULT_STYLE,
    border: `1px dashed ${colors.inputBorderColor}`,
  },
  [BUTTON_TYPES.LINK]: {
    backgroundColor: colors.white,
    color: colors.appPrimary,
    border: "none",
    hoverBorder: "none",
    hoverColor: colors.appPrimary,
    ghostColor: colors.appPrimary,
  },
});
