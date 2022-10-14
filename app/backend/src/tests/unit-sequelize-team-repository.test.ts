import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { SequelizeTeamRpository } from '../implementations/sequelize'
import Team from '../database/models/Team';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Sequelize user repository implementation', () => {
  let stubAll: sinon.SinonStub;
  let stubPyPk: sinon.SinonStub;

  before(() => {
    stubAll = sinon.stub(Team, 'findAll').resolves(
      [
        { id: 1, teamName: 'Corinthias'},
        { id: 2, teamName: 'Vasco' },
      ] as Team[]);

    stubPyPk = sinon.stub(Team, 'findByPk').resolves({ id: 1, teamName: 'Corinthias'} as Team);
  })

  after(() => {
    stubAll.restore()
    stubPyPk.restore();
  })

  describe('findAll', () => {
    it('should return a teams array', async () => {
      const teams = [{id: 1, teamName: 'Corinthias'}, { id: 2, teamName: 'Vasco' }];
      const sut = new SequelizeTeamRpository();
  
      await expect(sut.findAll())
        .to.eventually.be.a('array')
        .to.have.deep.ordered.members(teams);
    });
  });

  describe('findByPk', () => {
    it('should return a team by Id received', async () => {
      const ID = 1;
      const sequelize = new SequelizeTeamRpository();
      const sut = await sequelize.findById(ID);
  
      expect(sut).to.be.a('object');
      expect(sut).to.have.property('id', 1);
      expect(sut).to.have.property('teamName', "Corinthias");
    });

    it('should return null when team is not found', async () => {
      stubPyPk.resolves(null);

      const ID = 90;
      const sequelize = new SequelizeTeamRpository();
      const sut = await sequelize.findById(ID);
  
      expect(sut).to.be.equal(null);
    });
  })
});
