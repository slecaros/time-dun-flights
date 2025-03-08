import { Request } from 'express';
import { AnyZodObject, z } from 'zod';

// Define a type for the validated request data
type ValidatedRequest<T extends AnyZodObject> = z.infer<T>;

// Define a type for the request handler function
type RequestHandler<T extends AnyZodObject, R> = (validatedData: ValidatedRequest<T>) => Promise<R>;

/**
 * Creates an endpoint handler with Zod validation
 * @param schema The Zod schema to validate against
 * @param handler The handler function to execute with validated data
 */
export const validateRequest =
  <T extends AnyZodObject, R>(schema: T, handler: RequestHandler<T, R>) =>
  (req: Request) => {
    // Validate request data against schema
    const validatedData = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (validatedData.success) {
      return handler(validatedData.data);
    }

    throw new Error(validatedData.error.message);
  };
