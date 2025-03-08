import { z } from 'zod';
import { getFlightUseCase } from '../../../domain/use-cases/get-flight.use-case';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
  }),
});

export const handler = validateRequest(requestSchema, async (validatedData, _req, res) => {
  // Extract validated data
  const { flightCode } = validatedData.params;

  // Call use case with validated data
  const flight = await getFlightUseCase(flightCode);

  // Return successful response
  res.status(200).json(flight);
});
