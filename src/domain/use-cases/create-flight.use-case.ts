import { randomUUID } from 'crypto';
import { FlightRepository } from '../../data/repositories/flight.repository';
import { Passenger } from '../entities/passenger.entity';

const flightRepository = FlightRepository;

export const createFlightUseCase = async ({
  flightCode,
  passengers,
}: {
  flightCode?: string;
  passengers: Passenger[];
}) => {
  const flight = {
    flightCode: flightCode ?? randomUUID(),
    passengers,
  };

  return flightRepository.create(flight);
};
