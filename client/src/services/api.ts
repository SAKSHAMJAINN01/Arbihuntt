import axios from 'axios';
import { Opportunity, Stats } from '../types/common';

// In Vite, env vars are prefixed with VITE_
// However, since we set up a proxy in vite.config.ts, we can just use /api
const API_URL = '/api';

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
    const response = await axios.get<Opportunity[]>(`${API_URL}/opportunities`);
    return response.data;
};

export const fetchStats = async (): Promise<Stats> => {
    const response = await axios.get<Stats>(`${API_URL}/stats`);
    return response.data;
};
