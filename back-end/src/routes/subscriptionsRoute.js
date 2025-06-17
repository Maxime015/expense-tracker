import express from 'express';
import { 
  createSubscription, 
  deleteSubscription, 
  getSummaryByUserId, 
  getSubscriptionByUserId } from '../controllers/subscriptionController.js';

const router = express.Router();


// Routes (sans préfixe supplémentaire)
router.get('/:userId', getSubscriptionByUserId);
router.post('/', createSubscription);
router.delete('/:id', deleteSubscription);
router.get('/summary/:userId', getSummaryByUserId);

export default router;