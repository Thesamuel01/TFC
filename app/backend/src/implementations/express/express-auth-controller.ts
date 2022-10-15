import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvalidTokenError, TokenExpiredError } from '../../use-cases/errors';
import { Controller } from '../../adapters';
import { LoginUser } from '../../use-cases';
import HttpError from './helpers/http-status-error';

export default class ExpressAuthController implements Controller<Request, Response, NextFunction> {
  constructor(
    private loginUserUseCase: LoginUser,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      if (!req.headers.authorization) throw HttpError.badRequest('Token not found');

      const isValidatePath = /validate/.test(req.url);
      const token = req.headers.authorization;
      const { role } = this.loginUserUseCase.validate(token);

      return isValidatePath
        ? res.status(StatusCodes.OK).json({ role })
        : next();
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        return next(HttpError.unauthorized('Token must be a valid token'));
      }

      if (error instanceof TokenExpiredError) {
        return next(HttpError.unauthorized('Token expired'));
      }

      return next(error);
    }
  };
}
