const errorHandler = (error, req, res, next) => {
  const statusCode = error?.status || 500;

  const customError = error?.customError;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    message: error?.message || "Internal Server",
    ...customError,
  });
};

module.exports = errorHandler;
