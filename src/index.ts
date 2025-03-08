/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './_infrastructure/config/config';
import connectDB from './_infrastructure/db/mongoose';
import routes from './presentation/routes';
import { errorHandler } from './_infrastructure/middlewares/error.middleware';
import { requestLogger } from './_infrastructure/middlewares/logger.middleware';

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
