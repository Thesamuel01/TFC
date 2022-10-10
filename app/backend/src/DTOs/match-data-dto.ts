export interface MatchDataDTO {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }
}
