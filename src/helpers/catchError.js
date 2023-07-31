const catchError = (error) => {
  const err = new Error(error?.response?.data?.message || error?.response?.data?.Message || 'an error has occurred"');
  err.code = error?.response?.status;
debugger;
  console.error(`Status code: ${err.code} message: ${err}`);
  throw err;
};

export default catchError;
