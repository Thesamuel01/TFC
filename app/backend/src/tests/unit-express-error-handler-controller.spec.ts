import * as sinon from 'sinon';
import * as chai from 'chai';
import 'dotenv/config';

import { ExpressErrorHandlerController } from '../implementations/express';
import testController from './helpers/controllerTest';
import HttpError from '../implementations/express/helpers/http-status-error';

// @ts-ignore
const { expect } = chai;

describe('Express error handler controller implementation', () => {
  describe('handle', () => {
    it('should return the status code and a message when receive a HttpError instance', async () => {
      const errMessage = 'bad request';
      const sut = ExpressErrorHandlerController;
      
      const result = await testController(sut.handle, {}, HttpError.badRequest(errMessage));

      expect(result.status).to.be.equal(400);
      expect(result.body)
        .to.be.a('object')
        .to.have.property('message', errMessage);
    });

    it('should return the status code and a message when unexpected error', async () => {
      const errMessage = 'Unexpect Error';
      const sut = ExpressErrorHandlerController;
      const result = await testController(sut.handle, {}, new Error('Server Error'));

      expect(result.status).to.be.equal(500);
      expect(result.body)
        .to.be.a('object')
        .to.have.property('message', errMessage);
    });
  });
});
