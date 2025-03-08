import { z } from 'zod';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { removeFlightPassengerUseCase } from '../../../domain/use-cases/remove-flight-passenger.use-case';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
    passengerId: z
      .string()
      .refine((val) => !Number.isNaN(Number(val)), 'Passenger ID must be a number'),
  }),
});

export const handler = validateRequest(requestSchema, async (validatedData, _req, res) => {
  const { flightCode, passengerId } = validatedData.params;
  const flight = await removeFlightPassengerUseCase({
    flightCode,
    passengerId: parseInt(passengerId, 10),
  });

  res.status(200).json(flight);
});
