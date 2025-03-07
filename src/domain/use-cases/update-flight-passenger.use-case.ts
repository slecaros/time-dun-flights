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
    throw new Error('Flight not found or passenger not found');
  }

  return flight;
};
