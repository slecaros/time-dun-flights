import { FlightRepository } from '../../data/repositories/flight.repository';

const flightRepository = FlightRepository;

export const deleteFlightUseCase = async ({ flightCode }: { flightCode: string }) => {
  const flight = await flightRepository.deleteFlight(flightCode);

  if (!flight) {
    throw new Error('Flight not found');
  }

  return flight;
};
