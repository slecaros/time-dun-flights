import { ClientError, ERROR_CODES } from '../../_infrastructure/libs/errors';
import { Passenger } from '../entities/passenger.entity';
import { FlightRepository } from '../../data/repositories/flight.repository';

const flightRepository = FlightRepository;

export const updateFlightPassengerUseCase = async ({
  flightCode,
  passengerId,
  passenger,
}: {
  flightCode: string;
  passengerId: number;
  passenger: Partial<Omit<Passenger, 'id'>>;
}) => {
  const flight = await flightRepository.updatePassenger({
    search: { flightCode, passengerId },
    update: { passenger },
  });

  if (!flight) {
    throw new ClientError({
      message: `Passenger not found with id ${passengerId} in flight ${flightCode}`,
      errorCode: ERROR_CODES.NOT_FOUND,
    });
  }

  return flight;
};
