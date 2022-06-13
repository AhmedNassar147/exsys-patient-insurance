/*
 *
 * Package: `@exsys-patient-insurance/tag`.
 *
 */
import { BaseText } from "@exsys-patient-insurance/text";
import { colors } from "@exsys-patient-insurance/theme-values";
import CloseIcon from "@exsys-patient-insurance/close-icon";
import { TagWrapper } from "./styled";
import TagProps from "./index.interface";

const { appPrimary } = colors;

const Tag = ({ children, closable, onClose, ...restProps }: TagProps) => (
  <TagWrapper {...restProps} closable={closable}>
    <BaseText color="currentcolor" tag="span">
      {children}
    </BaseText>

    {closable && (
      <CloseIcon
        size="15px"
        width="15px"
        onClick={onClose}
        hoverColor={appPrimary}
      />
    )}
  </TagWrapper>
);
Tag.defaultProps = {
  closable: true,
  margin: "0 2px 0 0",
};

export default Tag;
