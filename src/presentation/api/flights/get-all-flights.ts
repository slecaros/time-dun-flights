import { getAllFlightsUseCase } from '../../../domain/use-cases/get-all-flights.use-case';

import { Request, Response } from 'express';

export const handler = async (req: Request, res: Response) => {
  const flights = await getAllFlightsUseCase();

  res.status(200).json(flights);
};
