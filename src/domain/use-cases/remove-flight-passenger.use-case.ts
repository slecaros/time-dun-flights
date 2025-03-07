import { FlightRepository } from "../../data/repositories/flight.repository";

const flightRepository = FlightRepository;

export const removeFlightPassengerUseCase = async ({
  flightCode,
  passengerId,
}:
{ flightCode: string, passengerId: number }) => {
  const flight = await flightRepository.removePassenger({ flightCode, passengerId });
  
  if (!flight) {
    throw new Error('Flight not found or passenger not found');
  }

  return flight;
};
