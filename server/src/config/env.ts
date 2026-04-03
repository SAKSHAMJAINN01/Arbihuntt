import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/arbihunt',
  logLevel: process.env.LOG_LEVEL || 'info',
  fetchInterval: parseInt(process.env.FETCH_INTERVAL_MS || '5000', 10),
  minProfitThreshold: parseFloat(process.env.MIN_PROFIT_THRESHOLD || '0.5'),
};
