import { z } from 'zod';
import { addFlightPassengersUseCase } from '../../../domain/use-cases/add-flight-pessengers.use-case';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';
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
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
  }),
  body: z.object({
    passengers: z.array(passengerSchema),
  }),
});

const addFlightPassengersHandler = validateRequest(requestSchema, async ({ params, body }) =>
  addFlightPassengersUseCase({ flightCode: params.flightCode, passengers: body.passengers }),
);

export const endpointHandler = createEndpointHandler(addFlightPassengersHandler);
