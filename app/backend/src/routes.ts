import 'express-async-errors';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { loginUserImplementation, getTeamsImplementation } from './implementations';
import HttpError from './implementations/express/helpers/http-status-error';

const router = Router();

router.post('/login', loginUserImplementation.handle);
router.get('/login/validate', loginUserImplementation.validate);
router.get('/team', getTeamsImplementation.handle);
router.get('/team/:id', getTeamsImplementation.handle);

router.use((
  err: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  console.error(`${err.name}: ${err.message}`);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Unexpect Error',
  });
});

export default router;
