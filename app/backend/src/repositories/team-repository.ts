import { Team } from '../entities';

export interface TeamRepository {
  findAll(): Promise<Team[]>
  findById(id: number): Promise<Team | null>
}
