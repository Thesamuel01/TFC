import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { CreateMatch } from '../use-cases';
import { InMemoryMatchRepository, InMemoryTeamRepository } from '../repositories/in-memory'
import { EqualTeamsIDsError, NotFoundError } from '../use-cases/errors';
import { matchWithAnInvalidTeamID, matchWithSameTeamIDs, newMatch } from './mocks/matches-mock';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Get teams use case', () => {
  let createMatchUseCase: CreateMatch;

  before(() => {
    const matchRepository = new InMemoryMatchRepository();
    const teamRepository = new InMemoryTeamRepository();
    createMatchUseCase = new CreateMatch(matchRepository, teamRepository);
  });

  describe('execute', () => {
    it('should return an array of teams', async () => {
      const data = { ...newMatch }
      await expect(createMatchUseCase.execute(data))
        .to.eventually.to.be.eql({ id: 4, ...newMatch});
    });

    it('should throw an error when a match with both team IDs are equal', async () => {
      const data = { ...matchWithSameTeamIDs };

      await expect(createMatchUseCase.execute(data))
        .to.eventually.rejectedWith(EqualTeamsIDsError);
    });

    it('should throw an error when team ids are not found in database', async () => {
      const data = { ...matchWithAnInvalidTeamID };
      await expect(createMatchUseCase.execute(data))
        .to.eventually.rejectedWith(NotFoundError)
    });
  });
})