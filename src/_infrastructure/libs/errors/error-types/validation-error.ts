import { CustomError } from './custom-error';

// ValidationError
/** This error should be thrown when any validation fails.
 * @class ValidationError
 */
export class ValidationError extends CustomError {
  /**
   *
   * @param {string} message - The error message, a user-friendly message for debugging purposes.
   * @param {string} errorCode - The error code, a message for identifying specific errors through our services.
   * @returns {ValidationError} - An instance of ValidationError
   * @example
   * // throw new ValidationError({ message: 'Validation failed', errorCode: 'MICRO_SERVICE_VALIDATION_FAILED' });
   */
  constructor({ message, errorCode }: { message: string; errorCode: string }) {
    super({ message, errorCode });

    this.name = 'ValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}
