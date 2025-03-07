import { FlightModel } from '../models/flight.model';
import { Flight } from '../../domain/entities/flight.entity';
import { Passenger } from '../../domain/entities/passenger.entity';

export interface FlightRepositoryInterface {
  getAll: () => Promise<Flight[]>;
  getByFlightCode: (flightCode: string) => Promise<Flight | null>;
  create: (flight: Omit<Flight, 'createdAt' | 'updatedAt'>) => Promise<Flight>;
  updatePassenger: (params: {
    search: { flightCode: string; passengerId: number };
    update: { passenger: Partial<Omit<Passenger, 'id'>> };
  }) => Promise<Flight | null>;
  removePassenger: (params: { flightCode: string; passengerId: number }) => Promise<Flight | null>;
  deleteFlight: (flightCode: string) => Promise<Flight | null>;
}

export const FlightRepository: FlightRepositoryInterface = {
  getAll: async () => {
    const flights = await FlightModel.find();

    return flights.map((flight) => flight.toJSON<Flight>());
  },

  getByFlightCode: async (flightCode) => {
    const flight = await FlightModel.findOne({ flightCode });
    return flight ? flight.toJSON<Flight>() : null;
  },

  create: async (flight) => {
    const newFlight = await FlightModel.create(flight);
    return newFlight.toJSON<Flight>();
  },

  updatePassenger: async ({ search: { flightCode, passengerId }, update: { passenger } }) => {
    const search = { flightCode, 'passengers.id': passengerId };
    const update = {
      $set: {
        ...(passenger.name && { 'passengers.$.name': passenger.name }),
        ...(passenger.age && { 'passengers.$.age': passenger.age }),
        ...(passenger.flightCategory && {
          'passengers.$.flightCategory': passenger.flightCategory,
        }),
        ...(passenger.hasConnections && {
          'passengers.$.hasConnections': passenger.hasConnections,
        }),
        ...(passenger.hasCheckedBaggage && {
          'passengers.$.hasCheckedBaggage': passenger.hasCheckedBaggage,
        }),
      },
    };

    const flight = await FlightModel.findOneAndUpdate(search, update, { new: true });
    return flight ? flight.toJSON<Flight>() : null;
  },

  removePassenger: async (params) => {
    const flight = await FlightModel.findOneAndUpdate(
      { flightCode: params.flightCode },
      { $pull: { passengers: { id: params.passengerId } } },
      { new: true },
    );
    return flight ? flight.toJSON<Flight>() : null;
  },

  deleteFlight: async (flightCode) => {
    const flight = await FlightModel.findOneAndDelete({ flightCode });
    return flight ? flight.toJSON<Flight>() : null;
  },
};
