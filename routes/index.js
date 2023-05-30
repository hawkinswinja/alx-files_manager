import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

router.get('/status', (req, res) => AppController.getStatus(req, res))
.get('/stats', (req, res) => AppController.getStats(req, res))
.post('/users', (req, res) => UsersController.postNew(req, res));
export default router;
