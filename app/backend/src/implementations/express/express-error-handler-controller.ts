import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from './helpers/http-status-error';

export default class ExpressErrorHandlerController {
  static handle = async (
    err: HttpError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response | void> => {
    // console.error(err);

    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Unexpect Error',
    });
  };
}
