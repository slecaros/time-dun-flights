import { FlightRepository } from '../../data/repositories/flight.repository';

const flightRepository = FlightRepository;

export const getAllFlightsUseCase = async () => flightRepository.getAll();
