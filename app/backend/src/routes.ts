import 'express-async-errors';
import { Router } from 'express';

import {
  loginUserImplementation,
  getTeamsImplementation,
  getMatchesImplementation,
  createMatchImplementation,
  authControllerImplementation,
  updateMatchImplementation,
} from './implementations';
import { ExpressErrorHandlerController } from './implementations/express';

const router = Router();

router.post('/login', loginUserImplementation.handle);
router.get('/login/validate', loginUserImplementation.validate);
router.get('/teams', getTeamsImplementation.handle);
router.get('/teams/:id', getTeamsImplementation.handle);
router.get('/matches', getMatchesImplementation.handle);
router.post('/matches', authControllerImplementation.handle, createMatchImplementation.handle);
router.patch('/matches/:id', updateMatchImplementation.handle);
router.patch('/matches/:id/finish', updateMatchImplementation.handle);

router.use(ExpressErrorHandlerController.handle);

export default router;
