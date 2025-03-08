import { z } from 'zod';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { removeFlightPassengerUseCase } from '../../../domain/use-cases/remove-flight-passenger.use-case';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
    passengerId: z
      .string()
      .refine((val) => !Number.isNaN(Number(val)), 'Passenger ID must be a number'),
  }),
});

const removeFlightPassengerHandler = validateRequest(
  requestSchema,
  async ({ params: { flightCode, passengerId } }) =>
    removeFlightPassengerUseCase({
      flightCode,
      passengerId: parseInt(passengerId, 10),
    }),
);

export const endpointHandler = createEndpointHandler(removeFlightPassengerHandler);
