/*
 *
 * `debounce`: `@exsys-patient-insurance/helpers`.
 *
 */
const debounce = (fn: Function, timeout = 250) => {
  let timerId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), timeout);
  };
};

export default debounce;
