import { useState, useEffect } from 'react';
import { Opportunity, Stats } from '../types/common';
import { fetchOpportunities, fetchStats } from '../services/api';

export const useArbitrageData = () => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            const [opps, statistics] = await Promise.all([
                fetchOpportunities(),
                fetchStats()
            ]);
            setOpportunities(opps);
            setStats(statistics);
            setError(null);
        } catch (err) {
            setError('Failed to fetch arbitrage data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    return { opportunities, stats, loading, error };
};
