# Time-Dun-Flights API

A TypeScript REST API built with Express and MongoDB, following Clean Architecture principles.

## Project Structure

The project follows Clean Architecture with the following layers:

- **\_Infrastructure**: Contains configuration, database connection, middlewares and some custom libs
- **Data**: Implements repositories and data models
- **Domain**: Contains business logic, entities, and use-cases
- **Presentation**: Contains routes an the controllers/handlers

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose

## Getting Started

### Development with Docker

1. Clone the repository
2. Run the application with Docker Compose:

```bash
docker-compose up
```

This will start both the MongoDB database and the API server in development mode.

### Development without Docker

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Make sure you have MongoDB running locally or update the `.env` file with your MongoDB connection string
4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build the project for production
- `npm start`: Start the production server
- `npm run lint`: Run the linter

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/time-dun-flights
```

When running with Docker Compose, these variables are already set in the configuration.
