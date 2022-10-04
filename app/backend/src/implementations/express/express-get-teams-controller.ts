import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Team from '../../entities/team';
import { NotFoundError } from '../../use-cases/errors';
import { Controller } from '../../adapters';
import { GetTeams } from '../../use-cases';
import HttpError from './helpers/http-status-error';

export default class ExpressGetTeamsController
implements Controller<Request, Response, NextFunction> {
  constructor(
    private getTeamsUseCase: GetTeams,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      let result: Team | Team[];

      if (req.params.id) {
        const { id } = req.params;
        const parseInt = Number(id);

        if (Number.isNaN(parseInt)) throw HttpError.badRequest('Request param must be a number');

        result = await this.getTeamsUseCase.execute(parseInt);
      } else {
        result = await this.getTeamsUseCase.execute();
      }

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      if (err instanceof NotFoundError) {
        return next(HttpError.notFound('Team not found'));
      }

      return next(err);
    }
  };
}
