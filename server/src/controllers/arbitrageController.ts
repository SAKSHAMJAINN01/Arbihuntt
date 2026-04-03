import { Request, Response } from 'express';
import Opportunity from '../models/Opportunity';
import logger from '../utils/logger';

export const getOpportunities = async (req: Request, res: Response) => {
  try {
    // Get latest 50 opportunities sorted by timestamp descending
    const opportunities = await Opportunity.find()
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json(opportunities);
  } catch (error) {
    logger.error('Error fetching opportunities:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const stats = await Opportunity.aggregate([
            {
                $group: {
                    _id: null,
                    totalFound: { $sum: 1 },
                    maxProfit: { $max: "$profitPercentage" },
                    cumulativeProfitPct: { $sum: "$profitPercentage" }
                }
            }
        ]);

        const topOpp = await Opportunity.findOne().sort({ profitPercentage: -1 });

        const result = stats.length > 0 ? stats[0] : { totalFound: 0, maxProfit: 0, cumulativeProfitPct: 0 };

        // Calculate theoretical profit assuming $1000 trade per opportunity
        // 1% profit on $1000 = $10.
        const theoreticalProfit = result.cumulativeProfitPct * 10; 

        res.json({ 
            totalOpportunitiesFound: result.totalFound, 
            topOpportunity: topOpp,
            theoreticalProfit: theoreticalProfit
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
