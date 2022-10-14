import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';

import { SequelizeMatchReposiroty } from '../implementations/sequelize'
import { Match as MatchEntity } from '../entities';
import { MatchDataDTO } from '../DTOs';
import { matchesMockResult, newMatch } from './mocks/matches-mock';
import Match from '../database/models/Match';

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Sequelize user repository implementation', () => {
  describe('findAll', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(matchesMockResult as unknown as Match[])
    });

    after(() => (Match.findAll as sinon.SinonStub).restore());

    it('should return an array of matches', async () => {
      const sut = new SequelizeMatchReposiroty();

      await expect(sut.findAll()).to.eventually.be.eql(matchesMockResult);
    });
  });

  describe('update', () => {
    let update: sinon.SinonStub;

    before(() => {
      update = sinon.stub(Match, 'update');
    });

    after(() => update.restore());

    it('should call update method from model', async () => {
      const sut = new SequelizeMatchReposiroty();
      await sut.update({
        id: 1,
        inProgress: false,
      })

      expect(update).to.have.been.called;
    });
  });

  describe('insert', () => {
    let create: sinon.SinonStub;

    before(() => {
      sinon.stub(Match, 'create').resolves({ id: 3, ...newMatch } as MatchDataDTO as Match);
    });
  
    after(() => {
      (Match.create as sinon.SinonStub).restore()
    });

    it('should return the match created', async () => {
      create
      const sut = new SequelizeMatchReposiroty();
      const match = MatchEntity.create({
        homeTeamId: 1,
        homeTeamName: 'Corinthias',
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamName: 'Vasco',
        awayTeamGoals: 2,
        inProgress: true,
      });

      await expect(sut.insert(match)).to.eventually.be.eql({
        id: 3,
        homeTeam: 1,
        homeTeamGoals: 2,
        awayTeam: 2,
        awayTeamGoals: 2,
        inProgress: true,
      });
    });
  });
});
