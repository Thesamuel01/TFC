import { NextFunction, Request, Response } from 'express';
import { EqualTeamsIDsError, NotFoundError } from '../../use-cases/errors';
import { Controller } from '../../adapters';
import { CreateMatch } from '../../use-cases';
import HttpError from './helpers/http-status-error';

export default class ExpressCreateMatchController
implements Controller<Request, Response, NextFunction> {
  constructor(
    private createMatchUseCase: CreateMatch,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

      const result = await this.createMatchUseCase.execute({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      });

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof EqualTeamsIDsError) {
        const message = 'It is not possible to create a match with two equal teams';

        return next(HttpError.unauthorized(message));
      }

      if (error instanceof NotFoundError) {
        return next(HttpError.notFound('There is no team with such id!'));
      }

      return next(error);
    }
  };
}
