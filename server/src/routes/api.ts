import { Router } from 'express';
import { getOpportunities, getStats } from '../controllers/arbitrageController';

const router = Router();

router.get('/opportunities', getOpportunities);
router.get('/stats', getStats);

export default router;
