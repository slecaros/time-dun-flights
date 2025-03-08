/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export const createEndpointHandler =
  (handler: (req: Request) => Promise<any>) => async (req: Request, res: Response) => {
    try {
      const result = await handler(req);

      res.status(200).json(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Endpoint handler error:', error);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
