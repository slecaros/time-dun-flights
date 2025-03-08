import { z } from 'zod';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { getAllFlightsUseCase } from '../../../domain/use-cases/get-all-flights.use-case';
import { createEndpointHandler } from '../../../_infrastructure/libs/endpoint-handler/endpoint-handler';

const requestSchema = z.object({});

const getAllFlightsHandler = validateRequest(requestSchema, async () => getAllFlightsUseCase());

export const endpointHandler = createEndpointHandler(getAllFlightsHandler);
