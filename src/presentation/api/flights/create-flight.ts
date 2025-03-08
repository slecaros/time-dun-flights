import { z } from 'zod';
import { createFlightUseCase } from '../../../domain/use-cases/create-flight.use-case';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';

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

const createFlightHandler = validateRequest(
  requestSchema,
  async ({ body: { flightCode, passengers } }) => createFlightUseCase({ flightCode, passengers }),
);

export const endpointHandler = createEndpointHandler(createFlightHandler);
