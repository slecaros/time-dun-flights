import { Request, Response } from 'express';
import { deleteFlightUseCase } from '../../../domain/use-cases/delete-flight.use-case';

export const handler = async (req: Request, res: Response) => {
  const { flightCode } = req.params;
  const flight = await deleteFlightUseCase({ flightCode });

  res.status(200).json(flight);
};