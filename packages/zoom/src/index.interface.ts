/*
 *
 * Types: `@exsys-patient-insurance/zoom`.
 *
 */
export interface ZoomOptionsProps {
  onReset: () => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
  fileUrl?: string;
}

export default interface ZoomProps {
  children: React.ReactNode;
  leftSideText?: string;
  fileUrl?: string;
  zoomFactor?: number;
}
