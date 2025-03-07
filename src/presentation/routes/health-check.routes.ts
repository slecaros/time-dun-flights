import { Router } from 'express';
import { HealthCheckController } from '../controllers/health-check.controller';

const router = Router();
const healthCheckController = new HealthCheckController();

router.get('/', (req, res) => healthCheckController.execute(req, res));

export default router; 