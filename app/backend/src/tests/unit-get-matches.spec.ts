import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { GetMatches } from '../use-cases';
import { InMemoryMatchRepository } from '../repositories/in-memory'
import { matchesMockResult } from './mocks/matches-mock';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Get matches use case', () => {
  let getMatchesUseCase: GetMatches;
  let matchRepository: InMemoryMatchRepository;

  before(() => {
    matchRepository = new InMemoryMatchRepository();
    getMatchesUseCase = new GetMatches(matchRepository);
  });

  describe('execute', () => {
    it('should return an array of matches when is not receveid an param', async () => {
      const sut = await getMatchesUseCase.execute();
      const matches = [ ...matchesMockResult ];
      
      expect(sut).to.be.a('array');
      expect(sut).to.have.deep.ordered.members(matches);
    });

    it('should return an array of matches in progress when is received inProgress: true by params', async () => {
      const params = { inProgress: true };
      const sut = await getMatchesUseCase.execute(params);
      
      expect(sut).to.be.a('array');
      expect(sut[0]).to.have.property('inProgress', true);
    });

    it('should return an array of matches in progress when is received inProgress: false by params', async () => {
      const params = { inProgress: false };
      const sut = await getMatchesUseCase.execute(params);
      
      expect(sut).to.be.a('array');
      expect(sut[0]).to.have.property('inProgress', false);
    });
  });
})