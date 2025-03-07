import { Router } from 'express';
import healthCheckRoutes from './health-check.routes';
import flightsRoutes from './flights.routes';

const router = Router();

// Health check route
router.use('/health-check', healthCheckRoutes);

// Flights routes
router.use('/flights', flightsRoutes);

export default router; 