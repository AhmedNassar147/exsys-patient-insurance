/*
 *
 * Hook: `useNormalizeSlides`.
 *
 */
import { useMemo } from "react";
import normalizeSlides, { NormalizeConfig } from "../helpers/normalizeSlides";

const useNormalizeSlides = (config: NormalizeConfig) =>
  useMemo(() => normalizeSlides(config), [config]);

export default useNormalizeSlides;
