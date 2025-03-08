import { z } from 'zod';
import { updateFlightPassengerUseCase } from '../../../domain/use-cases/update-flight-passenger.use-case';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1),
    passengerId: z
      .string()
      .refine((val) => !Number.isNaN(Number(val)), 'Passenger ID must be a number'),
  }),
  body: z.object({
    passenger: z.object({
      name: z.string().min(1).optional(),
      hasConnections: z.boolean().optional(),
      age: z.number().min(0).optional(),
      flightCategory: z.enum(['Black', 'Platinum', 'Gold', 'Normal']).optional(),
      reservationId: z.string().min(1).optional(),
      hasCheckedBaggage: z.boolean().optional(),
    }),
  }),
});

export const handler = validateRequest(requestSchema, async (validatedData, _req, res) => {
  const { flightCode, passengerId } = validatedData.params;
  const { passenger } = validatedData.body;

  const flight = await updateFlightPassengerUseCase({
    flightCode,
    passengerId: parseInt(passengerId, 10),
    passenger,
  });

  res.status(200).json(flight);
});
