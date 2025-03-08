import { ClientError } from './error-types/client-error';
import { ValidationError } from './error-types/validation-error';
import { ERROR_CODES } from './error-codes/error-codes';

/**
 * Throws a validation error with the given message
 * @param message The error message
 */
export const throwValidationError = (message: string): never => {
  throw new ValidationError({
    message,
    errorCode: ERROR_CODES.VALIDATION_ERROR,
  });
};

/**
 * Throws a not found error with the given message
 * @param message The error message
 */
export const throwNotFoundError = (message: string): never => {
  throw new ClientError({
    message,
    errorCode: ERROR_CODES.NOT_FOUND,
  });
};

/**
 * Throws a client error with the given message
 * @param message The error message
 */
export const throwClientError = (message: string): never => {
  throw new ClientError({
    message,
    errorCode: ERROR_CODES.CLIENT_ERROR,
  });
};
