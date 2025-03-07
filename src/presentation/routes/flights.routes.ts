import { Router } from 'express';
import { FlightsController } from '../controllers/flights.controller';

const router = Router();
const flightsController = new FlightsController();

// GET /api/flights
router.get('/', (req, res) => flightsController.execute(req, res));

// You can add more routes here:
// router.get('/:id', (req, res) => flightsController.getById(req, res));
// router.post('/', (req, res) => flightsController.create(req, res));
// router.put('/:id', (req, res) => flightsController.update(req, res));
// router.delete('/:id', (req, res) => flightsController.delete(req, res));

export default router; 