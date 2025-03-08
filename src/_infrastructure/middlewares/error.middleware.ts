import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../libs/errors';

const getCustomErrorHTTPCode = <T extends CustomError>(error: T): number => {
  switch (error.name) {
    case 'ValidationError':
      return 400;
    case 'ClientError':
      return 400;
    case 'CustomError':
      return 500;
    default:
      return 418;
  }
};

interface AppError extends Error {
  statusCode?: number;
  errors?: unknown;
  code?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  if (err instanceof CustomError) {
    res.status(getCustomErrorHTTPCode(err)).json({
      status: 'error',
      message: err.message,
      errorCode: err.errorCode,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
    return;
  }

  // Default error handler for unhandled errors
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
