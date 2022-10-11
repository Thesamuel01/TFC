import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MatchDataDTO } from '../../DTOs';
import { Controller } from '../../adapters';
import { GetMatches } from '../../use-cases';
import HttpError from './helpers/http-status-error';

export default class ExpressGetMatchesController
implements Controller<Request, Response, NextFunction> {
  constructor(
    private getMatchesUseCase: GetMatches,
  ) {}

  handle = async (req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
    const hasQueryString = Object.prototype.hasOwnProperty.call(req.query, 'inProgress');
    let result: MatchDataDTO[];

    if (hasQueryString) {
      const { inProgress } = req.query;

      if (inProgress !== 'true' && inProgress !== 'false') {
        throw HttpError.badRequest('inProgress query string must be a boolean value');
      }

      const parseBoolean = inProgress === 'true';
      result = await this.getMatchesUseCase.execute({ inProgress: parseBoolean });
    } else {
      result = await this.getMatchesUseCase.execute();
    }

    return res.status(StatusCodes.OK).json(result);
  };
}
