import { Request, Response } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';

// Define a custom error type for API errors
interface ApiError extends Error {
  statusCode?: number;
}

// Define a type for the validated request data
type ValidatedRequest<T extends AnyZodObject> = z.infer<T>;

// Define a type for the request handler function
type RequestHandler<T extends AnyZodObject> = (
  validatedData: ValidatedRequest<T>,
  req: Request,
  res: Response,
) => Promise<void>;

/**
 * Creates an endpoint handler with Zod validation
 * @param schema The Zod schema to validate against
 * @param handler The handler function to execute with validated data
 */
export const validateRequest =
  <T extends AnyZodObject>(schema: T, handler: RequestHandler<T>) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request data against schema
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Call handler with validated data
      await handler(validatedData, req, res);
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }

      // If the error has a statusCode property, use it
      const errorObj = error as ApiError;
      const statusCode = errorObj.statusCode || 500;
      const message = errorObj.message || 'Internal server error';

      res.status(statusCode).json({
        status: 'error',
        message,
      });
    }
  };
