import { Router } from 'express';
import scoreCardRouter from './scoreCard';

const router = Router();

router.use('/', scoreCardRouter);

export default router;
