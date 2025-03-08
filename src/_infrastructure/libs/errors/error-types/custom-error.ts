type ExtendedError = {
  errorCode: string;
  message: string;
} & Error;

export class CustomError extends Error implements ExtendedError {
  errorCode: string;

  constructor({ message, errorCode }: { message: string; errorCode: string }) {
    super(message);

    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
