import { FlightRepository } from "../../data/repositories/flight.repository";
import { Flight } from "../entities/flight.entity";
import { Passenger } from "../entities/passenger.entity";
import { randomUUID } from "crypto";

const flightRepository = FlightRepository;

export const createFlightUseCase = async ({flightCode, passengers}:{flightCode?: string, passengers: Passenger[]}) => {

  const flight ={
    flightCode: flightCode?? randomUUID(),
    passengers,
  };

  return flightRepository.create(flight);
};
