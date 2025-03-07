import { Request, Response } from 'express';
import { removeFlightPassengerUseCase } from '../../../domain/use-cases/remove-flight-passenger.use-case';

export const handler = async (req: Request, res: Response) => {
  console.log('removeFlightPassengerHandler');
  const { flightCode, passengerId } = req.params;
  console.log({ flightCode, passengerId });
  const flight = await removeFlightPassengerUseCase({
    flightCode,
    passengerId: parseInt(passengerId, 10),
  });

  res.status(200).json(flight);
};
