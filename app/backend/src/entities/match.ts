import Team from './team';

export type MatchData = {
  id?: number;
  homeTeam: Team;
  homeTeamGoals: number;
  awayTeam: Team;
  awayTeamGoals: number;
  inProgress: boolean;
};

export type UpdateMatchData = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export default class Match {
  public readonly id: number;
  public readonly homeTeam: Team;
  public readonly homeTeamGoals: number;
  public readonly awayTeam: Team;
  public readonly awayTeamGoals: number;
  public readonly inProgress: boolean;

  private constructor(props: MatchData) {
    if (props.id) {
      this.id = props.id;
    }

    this.homeTeam = Team.create({
      id: props.homeTeam.id,
      name: props.homeTeam.teamName,
    });
    this.awayTeam = Team.create({
      id: props.awayTeam.id,
      name: props.awayTeam.teamName,
    });

    this.homeTeamGoals = props.homeTeamGoals;
    this.awayTeamGoals = props.awayTeamGoals;
    this.inProgress = props.inProgress;
  }

  static create(props: MatchData) {
    return new Match({
      id: props.id,
      homeTeam: props.homeTeam,
      homeTeamGoals: props.awayTeamGoals,
      awayTeam: props.awayTeam,
      awayTeamGoals: props.awayTeamGoals,
      inProgress: props.inProgress,
    });
  }
}
