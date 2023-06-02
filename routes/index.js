import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

router.get('/status', (req, res) => AppController.getStatus(req, res))
  .get('/stats', (req, res) => AppController.getStats(req, res))
  .get('/connect', (req, res) => AuthController.getConnect(req, res))
  .get('/disconnect', (req, res) => AuthController.getDisconnect(req, res))
  .get('/users/me', (req, res) => UsersController.getMe(req, res))
  .post('/files', (req, res) => FilesController.postUpload(req, res))
  .post('/users', (req, res) => UsersController.postNew(req, res));
export default router;
