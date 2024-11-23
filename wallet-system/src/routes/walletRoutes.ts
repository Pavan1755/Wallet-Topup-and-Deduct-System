import { Router } from 'express';
import { topupWallet, deductWallet, getBalance } from '../controllers/walletController';

const router = Router();

router.post('/topup', topupWallet);
router.post('/deduct', deductWallet);
router.get('/balance', getBalance);

export default router;
