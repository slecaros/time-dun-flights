import { z } from 'zod';
import { validateRequest } from '../../../_infrastructure/libs/endpoint-validator/validate-request';
import { getAllFlightsUseCase } from '../../../domain/use-cases/get-all-flights.use-case';

const requestSchema = z.object({});

export const handler = validateRequest(requestSchema, async (_validatedData, _req, res) => {
  const flights = await getAllFlightsUseCase();

  res.status(200).json(flights);
});
