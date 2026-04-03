import axios from 'axios';
import logger from '../utils/logger';

interface KrakenTicker {
  [pair: string]: {
    a: [string, string, string]; // Ask: [price, whole lot volume, lot volume]
    b: [string, string, string]; // Bid: [price, whole lot volume, lot volume]
  };
}

export const getKrakenPrices = async (): Promise<Record<string, { bid: number; ask: number }>> => {
  try {
    // Fetching a subset of popular assets to avoid huge payload or rate limits
    // Kraken symbols are weird (e.g., XXBTZUSD). We'll focus on major ones mapped to USDT equivalents if possible,
    // but Kraken usually uses USD. For this demo, we assume USD ~= USDT for arbitrage calc or we filter strictly.
    // Let's stick to strict asset matching: BTC/USDT, ETH/USDT.
    // Kraken Tickers: XBTUSDT, ETHUSDT, etc.
    const pairs = 'XBTUSDT,ETHUSDT,LTCUSDT,XRPUSDT,ADAUSDT';
    const response = await axios.get<{ result: KrakenTicker }>(`https://api.kraken.com/0/public/Ticker?pair=${pairs}`);

    const prices: Record<string, { bid: number; ask: number }> = {};
    const result = response.data.result;

    for (const [key, value] of Object.entries(result)) {
      // Kraken pair names can be "XBTUSDT" or "ETHUSDT".
      // Normalize: XBT -> BTC
      let asset = key.replace('USDT', '');
      if (asset === 'XBT') asset = 'BTC';
      // XETH -> ETH, etc. Kraken sometimes prefixes 'X' or 'Z'.
      // For simplicity in this 'production-grade' demo, we handle the known return keys.
      // XBTUSDT -> BTC
      
      prices[asset] = {
        bid: parseFloat(value.b[0]),
        ask: parseFloat(value.a[0]),
      };
    }

    return prices;
  } catch (error) {
    logger.error('Error fetching Kraken prices', error);
    return {};
  }
};
