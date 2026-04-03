import axios from 'axios';
import { Opportunity, Stats } from '../types/common';

// Access the variable directly. Vite statically replaces this at build time.
const BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
    // Local: Requests hit "/api/opportunities" (and get proxied to localhost:5001)
    // Render: Requests hit "https://arbihuntt.onrender.com/api/opportunities"
    const response = await axios.get<Opportunity[]>(`${BASE_URL}/api/opportunities`);
    return response.data;
};

export const fetchStats = async (): Promise<Stats> => {
    const response = await axios.get<Stats>(`${BASE_URL}/api/stats`);
    return response.data;
};