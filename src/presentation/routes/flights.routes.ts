import { Router } from 'express';
import { handler as createFlightHandler } from '../api/flights/create-flight';
import { handler as getAllFlightsHandler } from '../api/flights/get-all-flights';
import { handler as getFlightHandler } from '../api/flights/get-flight';
import { handler as updateFlightPassengerHandler } from '../api/flights/update-flight-passenger';
const router = Router();

// GET /api/flights
router.get('/', (req, res) => getAllFlightsHandler(req, res));

// POST /api/flights
router.post('/', (req, res) => createFlightHandler(req, res));

// GET /api/flights/:flightCode
router.get('/:flightCode', (req, res) => getFlightHandler(req, res));

// PUT /api/flights/:flightCode/passengers/:passengerId
router.put('/:flightCode/passengers/:passengerId', (req, res) => updateFlightPassengerHandler(req, res));

// router.put('/:id', (req, res) => flightsController.update(req, res));
// router.delete('/:id', (req, res) => flightsController.delete(req, res));

export default router; 