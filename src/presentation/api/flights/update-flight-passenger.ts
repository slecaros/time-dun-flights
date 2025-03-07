import { updateFlightPassengerUseCase } from "../../../domain/use-cases/update-flight-passenger.use-case";
import { Request, Response } from 'express';

export const handler = async (req: Request, res: Response) => {
  const { flightCode, passengerId } = req.params;
  const { passenger } = req.body;

  const flight = await updateFlightPassengerUseCase({
    flightCode,
    passengerId: parseInt(passengerId),
    passenger
  });

  res.status(200).json(flight);
};