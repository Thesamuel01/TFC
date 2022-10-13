import { MatchDataDTO } from '../DTOs';
import Team from './team';

export type LeaderBoardData = {
  readonly name: string;
  readonly totalGames: number;
  readonly totalVictories: number;
  readonly totalDraws: number;
  readonly totalLosses: number;
  readonly goalsFavor: number;
  readonly goalsOwn: number;
  readonly totalPoints?: number,
  readonly goalsBalance?: number,
  readonly efficiency?: string,
};

export default class LeaderBoard {
  public readonly name: string;
  public readonly totalGames: number;
  public readonly totalVictories: number;
  public readonly totalDraws: number;
  public readonly totalLosses: number;
  public readonly goalsFavor: number;
  public readonly goalsOwn: number;

  private constructor(props: LeaderBoardData) {
    Object.assign(this, props);
  }

  public get totalPoints(): number {
    const winPoints = this.totalVictories * 3;
    const tiePoints = this.totalDraws * 1;
    const result = winPoints + tiePoints;

    return result;
  }

  public get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  public get efficiency(): string {
    const value = this.totalPoints / (this.totalGames * 3);
    const percentageResult = (value * 100).toFixed(2);

    return percentageResult;
  }

  public get priority() {
    const priority = [
      this.totalPoints,
      this.totalVictories,
      this.goalsBalance,
      this.goalsFavor,
      this.goalsOwn,
    ];

    return priority;
  }

  public format(): LeaderBoardData {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }

  static create(props: LeaderBoardData) {
    return new LeaderBoard({ ...props });
  }

  static calcGamesResult({ id }: Team, matches: MatchDataDTO[]) {
    const totalDraws = matches
      .filter(({ awayTeamGoals, homeTeamGoals }) => awayTeamGoals === homeTeamGoals).length;
    const totalVictories = matches
      .filter(({ homeTeam, awayTeamGoals, homeTeamGoals }) => {
        if (homeTeam === id) return homeTeamGoals > awayTeamGoals;

        return awayTeamGoals > homeTeamGoals;
      }).length;
    const totalLosses = matches.length - totalVictories - totalDraws;

    return {
      totalVictories,
      totalDraws,
      totalLosses,
    };
  }

  static calcGoalsAmount({ id }: Team, matches: MatchDataDTO[]) {
    const result = matches
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id) {
          acc.goalsFavor += homeTeamGoals;
          acc.goalsOwn += awayTeamGoals;
        } else {
          acc.goalsFavor += awayTeamGoals;
          acc.goalsOwn += homeTeamGoals;
        }

        return acc;
      }, { goalsFavor: 0, goalsOwn: 0 });

    return result;
  }
}
