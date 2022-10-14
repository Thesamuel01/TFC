import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { UpdateMatch } from '../use-cases';
import { InMemoryMatchRepository } from '../repositories/in-memory'
import { updateMatchData } from './mocks/matches-mock';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Get matches use case', () => {
  let updateMatchUseCase: UpdateMatch;

  before(() => {
    const matchRepository = new InMemoryMatchRepository();
    updateMatchUseCase = new UpdateMatch(matchRepository);
  });

  describe('execute', () => {
    it('should return a update message when update match goals', async () => {
      expect(updateMatchUseCase.execute(updateMatchData))
        .to.eventually.be.a('object')
        .and.to.have.deep.property('message', 'Updated');
    });

    it('should return finish when update match in progress status', async () => {
      const params = { id: 1, inProgress: false }

      await expect(updateMatchUseCase.execute(params))
        .to.eventually.be.a('object')
        .and.to.have.deep.property('message', 'Finished');
    });
  });
});
