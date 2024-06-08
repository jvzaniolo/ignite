import type { CheckIn, Prisma } from "@prisma/client";
import type { ICheckInRepository } from "../CheckInRepository";

export class InMemoryCheckInRepository implements ICheckInRepository {
  private checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: "chk_" + this.checkIns.length + 1,
      userId: data.userId,
      gymId: data.gymId,
      createdAt: new Date(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
