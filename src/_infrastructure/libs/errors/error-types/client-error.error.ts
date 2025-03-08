import { CustomError } from './custom-error';

// ClientError
/** This error should be thrown when any client error happens.
 * @class ClientError
 */
export class ClientError extends CustomError {
  /**
   *
   * @param {string} message - The error message, a user-friendly message for debugging purposes.
   * @param {string} errorCode - The error code, a message for identifying specific errors through our services.
   * @returns {ClientError} - An instance of ClientError
   * @example
   * // throw new ClientError({ message: 'Some client error happened', errorCode: 'ANY_ERROR_CODE' });
   */
  constructor({ message, errorCode }: { message: string; errorCode: string }) {
    super({ message, errorCode });

    this.name = 'ClientError';
    Error.captureStackTrace(this, this.constructor);
  }
}
