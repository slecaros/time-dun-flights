import { Router } from 'express';
import { endpointHandler as createFlightEndpointHandler } from '../api/flights/create-flight';
import { endpointHandler as getAllFlightsEndpointHandler } from '../api/flights/get-all-flights';
import { endpointHandler as getFlightEndpointHandler } from '../api/flights/get-flight';
import { endpointHandler as updateFlightPassengerEndpointHandler } from '../api/flights/update-flight-passenger';
import { endpointHandler as removeFlightPassengerEndpointHandler } from '../api/flights/remove-flight-passenger';
import { endpointHandler as deleteFlightEndpointHandler } from '../api/flights/delete-flight';

const router = Router();

// GET /api/flights
router.get('/', getAllFlightsEndpointHandler);

// POST /api/flights
router.post('/', createFlightEndpointHandler);

// GET /api/flights/:flightCode
router.get('/:flightCode', getFlightEndpointHandler);

// PUT /api/flights/:flightCode/passengers/:passengerId
router.put('/:flightCode/passengers/:passengerId', updateFlightPassengerEndpointHandler);

// DELETE /api/flights/:flightCode/passengers/:passengerId
router.delete('/:flightCode/passengers/:passengerId', removeFlightPassengerEndpointHandler);

// DELETE /api/flights/:flightCode
router.delete('/:flightCode', deleteFlightEndpointHandler);

export default router;
