import { Request, Response } from 'express';
import { updateFlightPassengerUseCase } from '../../../domain/use-cases/update-flight-passenger.use-case';

export const handler = async (req: Request, res: Response) => {
  const { flightCode, passengerId } = req.params;
  const { passenger } = req.body;

  const flight = await updateFlightPassengerUseCase({
    flightCode,
    passengerId: parseInt(passengerId, 10),
    passenger,
  });

  res.status(200).json(flight);
};
