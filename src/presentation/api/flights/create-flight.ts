import { z } from 'zod';
import { createFlightUseCase } from '../../../domain/use-cases/create-flight.use-case';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';

const passengerSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  hasConnections: z.boolean(),
  age: z.number().int().min(0, 'Age must be a positive number'),
  flightCategory: z.enum(['Black', 'Platinum', 'Gold', 'Normal']),
  reservationId: z.string().min(1, 'Reservation ID is required'),
  hasCheckedBaggage: z.boolean(),
});

const requestSchema = z.object({
  body: z.object({
    flightCode: z.string().optional(),
    passengers: z.array(passengerSchema),
  }),
});

export const handler = validateRequest(requestSchema, async (validatedData, _req, res) => {
  // Extract validated data
  const { flightCode, passengers } = validatedData.body;

  // Call use case with validated data
  const flight = await createFlightUseCase({ flightCode, passengers });

  // Return successful response
  res.status(201).json(flight);
});
