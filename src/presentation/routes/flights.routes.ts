import { Router } from 'express';
import { FlightsController } from '../api/controllers/flights.controller';
import { handler as createFlightHandler } from '../api/flights/create-flight';
import { handler as getAllFlightsHandler } from '../api/flights/get-all-flights';
const router = Router();

// GET /api/flights
router.get('/', (req, res) => getAllFlightsHandler(req, res));

// POST /api/flights
router.post('/', (req, res) => createFlightHandler(req, res));

// You can add more routes here:
// router.get('/:id', (req, res) => flightsController.getById(req, res));
// router.put('/:id', (req, res) => flightsController.update(req, res));
// router.delete('/:id', (req, res) => flightsController.delete(req, res));

export default router; 