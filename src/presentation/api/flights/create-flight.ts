import { createFlightUseCase } from '../../../domain/use-cases/create-flight.use-case';
import { Request, Response, NextFunction } from 'express';

export const handler = async (req: Request, res: Response) => {
  const { flightCode, passengers } = req.body;

  const flight = await createFlightUseCase({ flightCode, passengers });

  res.status(200).json(flight);
};
