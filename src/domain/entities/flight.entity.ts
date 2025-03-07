import { Passenger } from './passenger.entity';

export type Flight = {
  flightCode: string;
  passengers: Passenger[];
  createdAt: Date;
  updatedAt: Date;
};
