/*
 *
 * Helper: `delayProcess`.
 *
 */
const delayProcess = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(false), ms));

export default delayProcess;
