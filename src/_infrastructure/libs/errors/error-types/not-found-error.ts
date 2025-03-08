import { CustomError } from './custom-error';

// NotFoundError
/** This error should be thrown when any resource is not found.
 * @class NotFoundError
 */
export class NotFoundError extends CustomError {
  /**
   *
   * @param {string} message - The error message, a user-friendly message for debugging purposes.
   * @param {string} errorCode - The error code, a message for identifying specific errors through our services.
   * @returns {NotFoundError} - An instance of NotFoundError
   * @example
   * // throw new NotFoundError({ message: 'Something was not found', errorCode: 'NOT_FOUND' });
   */
  constructor({ message, errorCode }: { message: string; errorCode: string }) {
    super({ message, errorCode });

    this.name = 'NotFoundError';
    Error.captureStackTrace(this, this.constructor);
  }
}
