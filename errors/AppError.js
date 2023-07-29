class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (message, statusCode) => {
  return new AppError(message, statusCode);
};

module.exports = { AppError, createError };
