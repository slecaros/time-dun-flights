import { Passenger } from './passenger.entity';

export type Flight = {
  capacity: number;
  flightCode: string;
  passengers: Passenger[];
  createdAt: Date;
  updatedAt: Date;
};
