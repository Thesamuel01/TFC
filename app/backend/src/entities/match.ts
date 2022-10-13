import Team from './team';

export type MatchData = {
  id?: number;
  homeTeamId: number;
  homeTeamName: string;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamName: string;
  awayTeamGoals: number;
  inProgress: boolean;
};

export type MatchAttr = {
  id?: number;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export type UpdateMatchData = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export default class Match {
  public readonly id?: number;
  public readonly homeTeamGoals: number;
  public readonly awayTeamGoals: number;
  public readonly inProgress: boolean;
  private readonly _homeTeam: Team;
  private readonly _awayTeam: Team;

  public get homeTeam() {
    return this._homeTeam.id;
  }

  public get awayTeam() {
    return this._awayTeam.id;
  }

  public get teamHome() {
    const { teamName } = this._homeTeam;

    return { teamName };
  }

  public get teamAway() {
    const { teamName } = this._awayTeam;

    return { teamName };
  }

  private constructor(props: MatchAttr) {
    if (props.id) {
      this.id = props.id;
    }

    this._homeTeam = props.homeTeam;
    this._awayTeam = props.awayTeam;
    this.homeTeamGoals = props.homeTeamGoals;
    this.awayTeamGoals = props.awayTeamGoals;
    this.inProgress = props.inProgress;
  }

  static create({
    id,
    homeTeamId,
    homeTeamName,
    homeTeamGoals,
    awayTeamId,
    awayTeamName,
    awayTeamGoals,
    inProgress,

  }: MatchData): Match {
    const homeTeam = Team.create({ id: homeTeamId, name: homeTeamName });
    const awayTeam = Team.create({ id: awayTeamId, name: awayTeamName });

    return new Match({ id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });
  }
}
