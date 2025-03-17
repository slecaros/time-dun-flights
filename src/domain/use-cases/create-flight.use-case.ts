import { randomUUID } from 'crypto';
import { FlightRepository } from '../../data/repositories/flight.repository';
import { Passenger } from '../entities/passenger.entity';

const flightRepository = FlightRepository;

export const createFlightUseCase = async ({
  flightCode,
  passengers,
  capacity,
}: {
  flightCode?: string;
  passengers: Passenger[];
  capacity: number;
}) => {
  const flight = {
    flightCode: flightCode ?? randomUUID(),
    passengers,
    capacity,
  };

  return flightRepository.create(flight);
};
