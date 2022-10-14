export const matchesMockResult = [
  {
    id: 1,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 5,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Corinthians',
    },
    teamAway: {
      teamName: 'Internacional',
    },
  },
  {
    id: 1,
    homeTeam: 2,
    homeTeamGoals: 3,
    awayTeam: 4,
    awayTeamGoals: 2,
    inProgress: true,
    teamHome: {
      teamName: 'Vasco',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
];

export const newMatch = {
  homeTeam: 1,
  homeTeamGoals: 2,
  awayTeam: 2,
  awayTeamGoals: 2,
  inProgress: true,
}

export const matchWithAnInvalidTeamID = {
  homeTeam: 3000,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

export const matchWithSameTeamIDs = {
  homeTeam: 1,
  homeTeamGoals: 2,
  awayTeam: 1,
  awayTeamGoals: 2,
  inProgress: true,
}

export const updateMatchData = {
  id: 1,
  homeTeamGoals: 3,
  awayTeamGoals: 1
}
