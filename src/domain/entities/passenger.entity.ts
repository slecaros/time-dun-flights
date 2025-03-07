type FlightCategory = 'Black' | 'Platinum' | 'Gold' | 'Normal';

export type Passenger = {
  id: number;
  name: string;
  hasConnections: boolean;
  age: number;
  flightCategory: FlightCategory;
  reservationId: string;
  hasCheckedBaggage: boolean;
};