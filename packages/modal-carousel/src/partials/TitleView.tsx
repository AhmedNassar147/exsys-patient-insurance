/*
 *
 * Component: `TitleView`.
 *
 */
import { memo } from "react";
import DeleteIcon from "@exsys-patient-insurance/delete-icon";
import Button from "@exsys-patient-insurance/button";
import Flex from "@exsys-patient-insurance/flex";
import Text from "@exsys-patient-insurance/text";
import { DotView } from "../styled";
import { ModalTitleProps } from "../index.interface";

const TitleView = ({
  title,
  caption,
  onDelete,
  data,
  activeSlide,
  onDotClicked,
}: ModalTitleProps) => (
  <Flex width="95.5%" justify="space-between">
    <Flex gap="5px" width="auto" align="center">
      <Text children={title} size="medium" />
      {caption && <Text children={caption} size="medium" />}
    </Flex>

    <Flex width="82%" justify="flex-end" align="center">
      {data && (
        <Flex margin="0px 8px">
          {data.map((_: any, idx: number) => (
            <DotView
              key={idx}
              active={activeSlide === idx}
              onClick={onDotClicked(idx)}
            />
          ))}
        </Flex>
      )}

      {onDelete && (
        <Button
          type="danger"
          shape="circle"
          icon={<DeleteIcon />}
          onClick={onDelete}
        />
      )}
    </Flex>
  </Flex>
);

export default memo(TitleView);
