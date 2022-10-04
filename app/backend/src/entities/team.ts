export type TeamData = {
  id: number,
  name: string,
};

export default class Team {
  public readonly id: number;
  public readonly teamName: string;

  private constructor(props: Team) {
    this.id = props.id;
    this.teamName = props.teamName;
  }

  static create(props: TeamData) {
    return new Team({
      id: props.id,
      teamName: props.name,
    });
  }
}
