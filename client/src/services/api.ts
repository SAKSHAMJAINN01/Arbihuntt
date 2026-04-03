import axios from 'axios';
import { Opportunity, Stats } from '../types/common';

// Using 'as any' bypasses the strict TypeScript check so Render won't crash during the build
const BASE_URL = (import.meta as any).env.VITE_API_URL || '';

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
    const response = await axios.get<Opportunity[]>(`${BASE_URL}/api/opportunities`);
    return response.data;
};

export const fetchStats = async (): Promise<Stats> => {
    const response = await axios.get<Stats>(`${BASE_URL}/api/stats`);
    return response.data;
};