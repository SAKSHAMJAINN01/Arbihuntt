import app from './app';
import { config } from './config/env';
import { connectDB } from './config/database';
import logger from './utils/logger';
import { startArbitrageEngine } from './services/arbitrageEngine';

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
    // Start background jobs
    startArbitrageEngine();
  });
};

startServer();
