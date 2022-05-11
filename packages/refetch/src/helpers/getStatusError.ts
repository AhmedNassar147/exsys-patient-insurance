/*
 *
 * `getStatusError`: `@exsys-clinio/refetch`.
 *
 */
const getStatusError = (status: number): string => {
  let error = "";
  switch (status) {
    case 400:
    case 402:
      error = "Client Error or invalid JSON";
      break;

    case 401:
      error = "authorization Required";
      break;

    case 403:
      error = "Forbidden Request";
      break;

    case 404:
      error = "Resource Not Found";
      break;

    case 500:
    case 502:
    case 503:
    case 504:
      error = "Server Error or TimeOut";
      break;

    default:
      error = "";
  }
  return error;
};

export default getStatusError;
