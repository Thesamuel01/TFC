import Team from './team';

export type TeamProps = {
  id: number,
  name: string,
};

export type MatchData = {
  id?: number;
  homeTeam: TeamProps;
  homeTeamGoals: number;
  awayTeam: TeamProps;
  awayTeamGoals: number;
  inProgress: boolean;
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
      name: props.homeTeam.name,
    });
    this.awayTeam = Team.create({
      id: props.awayTeam.id,
      name: props.awayTeam.name,
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
