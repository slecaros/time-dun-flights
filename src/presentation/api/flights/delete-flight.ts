import { z } from 'zod';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { deleteFlightUseCase } from '../../../domain/use-cases/delete-flight.use-case';

const requestSchema = z.object({
  params: z.object({
    flightCode: z.string().min(1, 'Flight code is required'),
  }),
});

export const handler = validateRequest(requestSchema, async (validatedData, _req, res) => {
  const { flightCode } = validatedData.params;
  const flight = await deleteFlightUseCase({ flightCode });

  res.status(200).json(flight);
});
