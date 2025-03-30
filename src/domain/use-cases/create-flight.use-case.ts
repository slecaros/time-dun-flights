import { randomUUID } from 'crypto';
import { groupBy, sumBy, orderBy } from 'lodash';
import { FlightRepository } from '../../data/repositories/flight.repository';
import { Passenger } from '../entities/passenger.entity';

const flightRepository = FlightRepository;

// edadI: < 14 -> 01
// categoB:   010000
// categoP:  000100
// categoG: 000001
// connectionFligt -> 1
// hasCheckedBaggage -> 01

// priorityScore = `${edadI}${categoB+categoP+categoG}${connectionFligt}${hasCheckedBaggage}`
const categoryScore = {
  Black: '010000',
  Platinum: '000100',
  Gold: '000001',
  Normal: '000000',
};
const passengerScore = (passenger: Passenger) => {
  const edadI = passenger.age < 14 ? '01' : '00';
  const connectionFligt = passenger.hasConnections ? '1' : '0';
  const hasCheckedBaggage = passenger.hasCheckedBaggage ? '01' : '00';

  return `${edadI}${categoryScore[passenger.flightCategory]}${connectionFligt}${hasCheckedBaggage}`;
};

const groupScore = (passengers: Passenger[]) => {
  const prioritizedScorePassengers = passengers.map(passengerScore);

  return sumBy(prioritizedScorePassengers, (score) => parseInt(score, 10));
};

const prioritizePassengers = ({
  passengers,
  capacity,
}: {
  passengers: Passenger[];
  capacity: number;
}) => {
  const groupedByReservationId = groupBy(passengers, 'reservationId');

  const groupWithPriorityScore = Object.values(groupedByReservationId).map((groupPassengers) => ({
    passengers: groupPassengers,
    score: groupScore(groupPassengers),
    size: groupPassengers.length,
  }));

  const prioritizedGroups = orderBy(groupWithPriorityScore, ['score', 'size'], 'desc');

  const passengerOnFlight: Passenger[] = [];
  const unassignedPassengers: Passenger[] = [];
  let availableCapacity = capacity;
  for (let i = 0; i < groupWithPriorityScore.length && availableCapacity > 0; i += 1) {
    if (prioritizedGroups[i].size <= availableCapacity) {
      passengerOnFlight.push(...prioritizedGroups[i].passengers);
      availableCapacity -= prioritizedGroups[i].size;
    } else {
      unassignedPassengers.push(...prioritizedGroups[i].passengers);
    }
  }

  return {
    passengerOnFlight,
    unassignedPassengers,
  };
};

export const createFlightUseCase = async ({
  flightCode,
  passengers,
  capacity,
}: {
  flightCode?: string;
  passengers: Passenger[];
  capacity: number;
}) => {
  const { passengerOnFlight } = prioritizePassengers({ passengers, capacity });

  const flight = {
    flightCode: flightCode ?? randomUUID(),
    passengers: passengerOnFlight,
    capacity,
  };

  return flightRepository.create(flight);
};
