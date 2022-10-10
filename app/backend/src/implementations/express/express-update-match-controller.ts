import { NextFunction, Request, Response } from 'express';
import { UpdateMatchDTO } from '../../DTOs';
import { Controller } from '../../adapters';
import { UpdateMatch } from '../../use-cases';

export default class ExpressUpdateMatchController
implements Controller<Request, Response, NextFunction> {
  constructor(
    private UpdateMatchUseCase: UpdateMatch,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const parseInt = +id;
      let params: UpdateMatchDTO;

      if (req.url.includes('finish')) {
        params = { id: parseInt, inProgress: false };
      } else {
        const { homeTeamGoals, awayTeamGoals } = req.body;
        params = { id: parseInt, homeTeamGoals, awayTeamGoals };
      }

      const result = await this.UpdateMatchUseCase.execute({ ...params });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
