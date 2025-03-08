import { z } from 'zod';
import { getFlightUseCase } from '../../../domain/use-cases/get-flight.use-case';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
  }),
});

const getFlightHandler = validateRequest(requestSchema, async ({ params: { flightCode } }) =>
  getFlightUseCase(flightCode),
);

export const endpointHandler = createEndpointHandler(getFlightHandler);
