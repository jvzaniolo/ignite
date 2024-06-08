import type { CheckIn, Prisma } from "@prisma/client";
import { db } from "~/lib/db";
import type { ICheckInRepository } from "../CheckInRepository";

export class PrismaCheckInRepository implements ICheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await db.checkIn.create({ data });
    return checkIn;
  }
}
