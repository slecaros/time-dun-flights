import { ClientError, ERROR_CODES } from '../../_infrastructure/libs/errors';
import { FlightRepository } from '../../data/repositories/flight.repository';

const flightRepository = FlightRepository;

export const removeFlightPassengerUseCase = async ({
  flightCode,
  passengerId,
}: {
  flightCode: string;
  passengerId: number;
}) => {
  const flight = await flightRepository.removePassenger({ flightCode, passengerId });

  if (!flight) {
    throw new ClientError({
      message: `Passenger not found with id ${passengerId} in flight ${flightCode}`,
      errorCode: ERROR_CODES.NOT_FOUND,
    });
  }

  return flight;
};
