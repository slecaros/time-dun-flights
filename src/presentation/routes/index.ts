import { Router } from 'express';
import flightsRoutes from './flights.routes';

const router = Router();

// Flights routes
router.use('/flights', flightsRoutes);

export default router; 