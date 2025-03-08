import { ClientError, ERROR_CODES } from '../../_infrastructure/libs/errors';
import { FlightRepository } from '../../data/repositories/flight.repository';

const flightRepository = FlightRepository;

export const deleteFlightUseCase = async ({ flightCode }: { flightCode: string }) => {
  const flight = await flightRepository.deleteFlight(flightCode);

  if (!flight) {
    throw new ClientError({
      message: `Flight not found with code ${flightCode}`,
      errorCode: ERROR_CODES.NOT_FOUND,
    });
  }

  return flight;
};
