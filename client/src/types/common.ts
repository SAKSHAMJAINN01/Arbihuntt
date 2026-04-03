export interface Opportunity {
    _id: string;
    asset: string;
    buyExchange: string;
    buyPrice: number;
    sellExchange: string;
    sellPrice: number;
    spread: number;
    profitPercentage: number;
    timestamp: string;
}

export interface Stats {
    totalOpportunitiesFound: number;
    topOpportunity: Opportunity | null;
    theoreticalProfit: number;
}
