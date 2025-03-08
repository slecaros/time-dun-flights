import { Passenger } from '../entities/passenger.entity';
import { ERROR_CODES, NotFoundError } from '../../_infrastructure/libs/errors/index';
import { FlightRepository } from '../../data/repositories/flight.repository';

const flightRepository = FlightRepository;

export const addFlightPassengersUseCase = async ({
  flightCode,
  passengers,
}: {
  flightCode: string;
  passengers: Passenger[];
}) => {
  const flight = await flightRepository.getByFlightCode(flightCode);
  if (!flight) {
    throw new NotFoundError({
      errorCode: ERROR_CODES.NOT_FOUND,
      message: `Flight not found with flightCode ${flightCode}`,
    });
  }

  return flightRepository.addPassengers({ flightCode, passengers });
};
