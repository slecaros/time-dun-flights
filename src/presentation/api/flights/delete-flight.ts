import { z } from 'zod';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { deleteFlightUseCase } from '../../../domain/use-cases/delete-flight.use-case';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
  }),
});

const deleteFlightHandler = validateRequest(requestSchema, async ({ params: { flightCode } }) =>
  deleteFlightUseCase({ flightCode }),
);

export const endpointHandler = createEndpointHandler(deleteFlightHandler);
