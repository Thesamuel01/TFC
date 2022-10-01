enum statusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

enum errorName {
  BAD_REQUEST = 'HttpErrorBadRequest',
  UNAUTHORIZED = 'HttpErrorUnauthorized',
}

export default class HttpError extends Error {
  public statusCode: number;

  private constructor(message: string, statusCode: number, errName: string) {
    super(message);

    this.name = errName;
    this.statusCode = statusCode;
  }

  static badRequest(message: string): HttpError {
    return new HttpError(
      message,
      statusCodes.BAD_REQUEST,
      errorName.BAD_REQUEST,
    );
  }

  static unauthorized(message: string): HttpError {
    return new HttpError(
      message,
      statusCodes.UNAUTHORIZED,
      errorName.UNAUTHORIZED,
    );
  }
}
