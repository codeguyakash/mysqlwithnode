class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something wrong wrong please try again",
    error = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data;
  }
}
