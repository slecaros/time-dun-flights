import { z } from 'zod';
import { updateFlightPassengerUseCase } from '../../../domain/use-cases/update-flight-passenger.use-case';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';

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

const updateFlightPassengerHandler = validateRequest(
  requestSchema,
  async ({ params: { flightCode, passengerId }, body: { passenger } }) =>
    updateFlightPassengerUseCase({
      flightCode,
      passengerId: parseInt(passengerId, 10),
      passenger,
    }),
);

export const endpointHandler = createEndpointHandler(updateFlightPassengerHandler);
