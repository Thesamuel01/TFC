import * as sinon from 'sinon';

export type Request = {
  body?: any,
  query?: any,
  params?: any,
  headers?: any,
  url?: string,
};

export type Response = {
  send(): void,
  json(obj: any): void,
  status(num: number): Response,
};

export type Result = {
  body: any,
  status: number | undefined,
}

const reqDefault: Request = {
  body: {},
  query: {},
  params: {},
  headers: {},
  url: '/',
}

const testController = async (
  controller: any,
  request: Request = reqDefault,
  err?: Error,
  ) => {
  const result: Result = {
    body: undefined,
    status: undefined,
  }

  const response: Response = {
    json: (obj: any): void => {
      result.body = obj
    },
    status: (num: number) => {
      result.status = num;
      return response
    },
    send: () => {},
  }

  const nextArgs = {
    error: null,
  }

  const nextFunc = (err: any) => {
    nextArgs.error = err
  }

  const spyJson = sinon.spy(response, 'json');
  const spyStatus = sinon.spy(response, 'status');
  const spyNext = sinon.spy(nextFunc);

  try {
    if (err) {
      await controller(err, request, response, spyNext);
    } else {
      await controller(request, response, spyNext);
    }
  } catch (error) {
    nextFunc(error);
  }


  return {
    ...result,
    spies: { json: spyJson, status: spyStatus, next: spyNext },
    ...nextArgs,
  };
}

export default testController;
