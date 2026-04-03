import { getBinancePrices } from './binanceService';
import { getKrakenPrices } from './krakenService';
import Opportunity from '../models/Opportunity';
import logger from '../utils/logger';
import { config } from '../config/env';

export const startArbitrageEngine = () => {
  logger.info('Starting Arbitrage Engine...');
  
  const runJob = async () => {
    try {
      const [binancePrices, krakenPrices] = await Promise.all([
        getBinancePrices(),
        getKrakenPrices()
      ]);

      const opportunities = [];

      // Find intersection of assets
      const assets = Object.keys(binancePrices).filter(asset => krakenPrices[asset]);
      
      logger.info(`Fetched prices. Binance: ${Object.keys(binancePrices).length}, Kraken: ${Object.keys(krakenPrices).length}, Overlap: ${assets.length}`);

      for (const asset of assets) {
        const binance = binancePrices[asset];
        const kraken = krakenPrices[asset];

        // Strategy 1: Buy Binance, Sell Kraken
        // We buy at 'ask' on Source, sell at 'bid' on Target
        const priceBuyBinance = binance.ask;
        const priceSellKraken = kraken.bid;

        const spread1 = priceSellKraken - priceBuyBinance;
        const profitPct1 = (spread1 / priceBuyBinance) * 100;

        if (profitPct1 > config.minProfitThreshold) {
            opportunities.push({
                asset,
                buyExchange: 'Binance',
                buyPrice: priceBuyBinance,
                sellExchange: 'Kraken',
                sellPrice: priceSellKraken,
                spread: spread1,
                profitPercentage: profitPct1,
                timestamp: new Date()
            });
        }

        // Strategy 2: Buy Kraken, Sell Binance
        const priceBuyKraken = kraken.ask;
        const priceSellBinance = binance.bid;

        const spread2 = priceSellBinance - priceBuyKraken;
        const profitPct2 = (spread2 / priceBuyKraken) * 100;

        if (profitPct2 > config.minProfitThreshold) {
            opportunities.push({
                asset,
                buyExchange: 'Kraken',
                buyPrice: priceBuyKraken,
                sellExchange: 'Binance',
                sellPrice: priceSellBinance,
                spread: spread2,
                profitPercentage: profitPct2,
                timestamp: new Date()
            });
        }
      }

      if (opportunities.length > 0) {
        await Opportunity.insertMany(opportunities);
        logger.info(`Found and stored ${opportunities.length} arbitrage opportunities.`);
      }

    } catch (error) {
      logger.error('Error in arbitrage engine job:', error);
    }
  };

  // Run immediately then interval
  runJob();
  setInterval(runJob, config.fetchInterval);
};
