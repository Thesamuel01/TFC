import { NextFunction, Request, Response } from 'express';
import { InvalidTokenError, TokenExpiredError } from '../../use-cases/errors';
import { Controller } from '../../adapters';
import { LoginUser } from '../../use-cases';
import HttpError from './helpers/http-status-error';

export default class ExpressAuthController implements Controller<Request, Response, NextFunction> {
  constructor(
    private loginUserUseCase: LoginUser,
  ) {}

  handle = async (req: Request, _res: Response, next: NextFunction): Promise<Response | void> => {
    if (!req.headers.authorization) {
      throw HttpError.badRequest('Token not found');
    }

    try {
      const token = req.headers.authorization;
      this.loginUserUseCase.validate(token);

      next();
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
