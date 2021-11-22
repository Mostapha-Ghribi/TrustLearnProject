import express from 'express';

import { signin, signup, verify} from '../controllers/user.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);
router.get('/verify-email' , verify);

export default router;