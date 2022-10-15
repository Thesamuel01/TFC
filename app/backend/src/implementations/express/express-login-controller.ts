import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginUserUseCase from '../../use-cases/login-user';
import { Controller } from '../../adapters';
import HttpError from './helpers/http-status-error';
import { InvalidEmailError, InvalidPasswordError } from '../../entities/errors';
import { IncorrectEmailError, IncorrectPasswordError } from '../../use-cases/errors';

export default class ExpressLoginController implements Controller<Request, Response, NextFunction> {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      if (!req.body.email || !req.body.password) {
        throw HttpError.badRequest('All fields must be filled');
      }

      const { email, password } = req.body;
      const token = await this.loginUserUseCase.execute({ email, password });

      return res.status(StatusCodes.OK).json(token);
    } catch (error) {
      if (error instanceof InvalidEmailError || error instanceof InvalidPasswordError) {
        return next(HttpError.badRequest('Incorrect email or password'));
      }

      if (error instanceof IncorrectEmailError || error instanceof IncorrectPasswordError) {
        return next(HttpError.unauthorized('Incorrect email or password'));
      }

      return next(error);
    }
  };
}
