import { Flight } from '../../domain/entities/flight.entity';
import { Passenger } from '../../domain/entities/passenger.entity';
import { Schema, model } from 'mongoose';

const PassengerSchema = new Schema<Passenger>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    hasConnections: { type: Boolean, required: true },
    age: { type: Number, required: true },
    flightCategory: { type: String, required: true },
    reservationId: { type: String, required: true },
    hasCheckedBaggage: { type: Boolean, required: true },
  },
  { _id: false, timestamps: false }
);

const FlightSchema = new Schema<Flight>(
  {
    flightCode: { type: String, required: true, unique: true },
    passengers: { type: [PassengerSchema], default: [] },
  },
  { timestamps: true }
);

FlightSchema.index({ flightCode: 1 }, { unique: true });
FlightSchema.index({ 'passengers.id': 1 });

export const FlightModel = model<Flight>('Flight', FlightSchema);
