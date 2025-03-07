import { Request, Response } from 'express';
import { getAllFlightsUseCase } from '../../../domain/use-cases/get-all-flights.use-case';

export const handler = async (req: Request, res: Response) => {
  const flights = await getAllFlightsUseCase();

  res.status(200).json(flights);
};
