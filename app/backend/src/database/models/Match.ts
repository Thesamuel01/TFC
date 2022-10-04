import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id: number;
  email: string;
  password: string;
  role: string;
  username: string;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    allowNull: false,
    type: STRING,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: STRING,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'home_team', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'away_team', as: 'teamAway' });

Match.hasMany(Team, { foreignKey: 'home_team', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'away_team', as: 'teamAway' });

export default Match;
