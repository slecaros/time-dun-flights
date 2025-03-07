import { FlightRepository } from "../../data/repositories/flight.repository";

const flightRepository = FlightRepository;

export const getFlightUseCase = async (flightCode: string) => {
  return flightRepository.getByFlightCode(flightCode);
};
