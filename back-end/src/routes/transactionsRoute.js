import express from 'express';
import { 
  createTransaction, 
  deleteTransaction, 
  getSummaryByUserId, 
  getTransactionByUserId } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/:userId', getTransactionByUserId);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);
router.get('/summary/:userId', getSummaryByUserId);

export default router;