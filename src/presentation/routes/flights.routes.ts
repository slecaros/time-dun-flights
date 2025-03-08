import { Router } from 'express';
import { handler as createFlightHandler } from '../api/flights/create-flight';
import { handler as getAllFlightsHandler } from '../api/flights/get-all-flights';
import { handler as getFlightHandler } from '../api/flights/get-flight';
import { handler as updateFlightPassengerHandler } from '../api/flights/update-flight-passenger';
import { handler as removeFlightPassengerHandler } from '../api/flights/remove-flight-passenger';
import { handler as deleteFlightHandler } from '../api/flights/delete-flight';

const router = Router();

// GET /api/flights
router.get('/', getAllFlightsHandler);

// POST /api/flights
router.post('/', createFlightHandler);

// GET /api/flights/:flightCode
router.get('/:flightCode', getFlightHandler);

// PUT /api/flights/:flightCode/passengers/:passengerId
router.put('/:flightCode/passengers/:passengerId', updateFlightPassengerHandler);

// DELETE /api/flights/:flightCode/passengers/:passengerId
router.delete('/:flightCode/passengers/:passengerId', removeFlightPassengerHandler);

// DELETE /api/flights/:flightCode
router.delete('/:flightCode', deleteFlightHandler);

export default router;
