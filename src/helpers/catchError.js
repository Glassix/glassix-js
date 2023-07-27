export const catchError = (error) => {
  const err = new Error(error?.response?.data?.message || error?.response?.data?.Message || 'an error has occurred"');
  err.code = error?.response?.status;
  throw err;
};
