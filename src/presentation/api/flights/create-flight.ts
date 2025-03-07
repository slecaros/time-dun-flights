import { Request, Response } from 'express';
import { createFlightUseCase } from '../../../domain/use-cases/create-flight.use-case';

export const handler = async (req: Request, res: Response) => {
  const { flightCode, passengers } = req.body;

  const flight = await createFlightUseCase({ flightCode, passengers });

  res.status(200).json(flight);
};
