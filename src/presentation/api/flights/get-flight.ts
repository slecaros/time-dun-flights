import { getFlightUseCase } from '../../../domain/use-cases/get-flight.use-case';

import { Request, Response } from 'express';

export const handler = async (req: Request, res: Response) => {
  console.log('getFlightHandler');
  const flightCode = req.params.flightCode;
  const flight = await getFlightUseCase(flightCode);

  res.status(200).json(flight);
};
