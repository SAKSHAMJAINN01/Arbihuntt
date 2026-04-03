import axios from 'axios';
import logger from '../utils/logger';

interface BinanceTicker {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

export const getBinancePrices = async (): Promise<Record<string, { bid: number; ask: number }>> => {
  try {
    const response = await axios.get<BinanceTicker[]>('https://api.binance.com/api/v3/ticker/bookTicker');
    const prices: Record<string, { bid: number; ask: number }> = {};

    response.data.forEach((ticker) => {
      // We only care about USDT pairs for simplicity
      if (ticker.symbol.endsWith('USDT')) {
        const asset = ticker.symbol.replace('USDT', '');
        prices[asset] = {
          bid: parseFloat(ticker.bidPrice),
          ask: parseFloat(ticker.askPrice),
        };
      }
    });
    return prices;
  } catch (error) {
    logger.error('Error fetching Binance prices', error);
    return {};
  }
};
