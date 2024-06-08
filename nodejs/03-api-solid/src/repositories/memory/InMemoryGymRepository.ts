import { type Gym } from "@prisma/client";
import type { IGymRepository } from "../GymRepository";

export class InMemoryGymRepository implements IGymRepository {
  private gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);
    return gym ? gym : null;
  }
}
