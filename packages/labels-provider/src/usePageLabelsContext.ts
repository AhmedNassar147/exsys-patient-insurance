/*
 *
 * usePageLabelsContext
 *
 */
import { useContext } from "react";
import labelsContext from "./context";

const usePageLabelsContext = () => useContext(labelsContext);

export default usePageLabelsContext;
