import 'express-async-errors';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { loginUserController } from './implementations/login-user-implementation';
import HttpError from './implementations/express/helpers/http-status-error';

const router = Router();

router.post('/login', loginUserController.handle);
router.get('/login/validate', loginUserController.validate);

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
