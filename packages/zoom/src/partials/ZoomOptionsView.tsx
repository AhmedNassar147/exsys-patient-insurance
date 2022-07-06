/*
 *
 * Component: `ZoomOptionsView`.
 *
 */
import { memo, useCallback } from "react";
import Button from "@exsys-patient-insurance/button";
import Flex from "@exsys-patient-insurance/flex";
import ZoomIcon from "@exsys-patient-insurance/zoom-icon";
import EyeIcon from "@exsys-patient-insurance/eye-icon";
import UndoIcon from "@exsys-patient-insurance/undo-icon";
import { ZoomOptionsProps } from "../index.interface";

const ZoomOptionsView = ({
  onReset,
  onZoomIn,
  onZoomOut,
  fileUrl,
}: ZoomOptionsProps) => {
  const createFnCallback = useCallback((fn: () => void) => () => fn(), []);

  return (
    <Flex width={fileUrl ? "138px" : "125px"} justify="space-between">
      <Button
        icon={<ZoomIcon type="out" />}
        size="small"
        type="primary"
        shape="circle"
        onClick={createFnCallback(onZoomIn)}
      />

      <Button
        icon={<ZoomIcon type="in" />}
        size="small"
        type="primary"
        shape="circle"
        onClick={createFnCallback(onZoomOut)}
      />

      <Button
        icon={<UndoIcon />}
        size="small"
        type="danger"
        shape="circle"
        onClick={createFnCallback(onReset)}
      />

      {fileUrl && (
        <Button
          icon={<EyeIcon />}
          size="small"
          type="primary"
          shape="circle"
          href={fileUrl}
          target="_blank"
        />
      )}
    </Flex>
  );
};

export default memo(ZoomOptionsView);
