/*
 *
 * `delayProcess`: `@exsys-patient-insurance/command-line-utils`.
 *
 */
const delayProcess = (fn, options, ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(fn(options));
    }, +ms)
  );

module.exports = delayProcess;
