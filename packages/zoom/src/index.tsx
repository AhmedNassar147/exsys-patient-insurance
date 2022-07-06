/*
 *
 * Package: `@exsys-patient-insurance/zoom`.
 *
 */
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Flex from "@exsys-patient-insurance/flex";
import Text from "@exsys-patient-insurance/text";
import ZoomOptionsView from "./partials/ZoomOptionsView";
import Props from "./index.interface";

const style = Object.freeze({
  width: "100%",
});

const Zoom = ({ children, leftSideText, fileUrl }: Props) => (
  <Flex width="100%" height="100%" column="true">
    <TransformWrapper initialScale={1}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <Flex
            width="100%"
            justify="space-between"
            align="center"
            margin="0 0 5px 0"
          >
            <Text children={leftSideText} width="88%" />

            <ZoomOptionsView
              onReset={resetTransform}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              fileUrl={fileUrl}
            />
          </Flex>
          <TransformComponent wrapperStyle={style} contentStyle={style}>
            {children}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  </Flex>
);

export default Zoom;
