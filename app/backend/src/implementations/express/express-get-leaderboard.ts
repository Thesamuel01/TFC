import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetLeaderBoard } from '../../use-cases';
import { Controller } from '../../adapters';

export default class ExpressGetLeaderBoardController
implements Controller<Request, Response, NextFunction> {
  constructor(
    private getLeaderBoardUseCase: GetLeaderBoard,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const regex = /(away)|(home)/;
      const hasFilter = regex.exec(req.url);
      const teamCategory = hasFilter ? hasFilter[0] : undefined;
      const result = await this.getLeaderBoardUseCase.execute(teamCategory);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}
