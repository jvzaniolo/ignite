import { Prisma } from "@prisma/client";
import { db } from "~/lib/db";
import { IUserRepository } from "../UserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await db.user.create({ data });
    return user;
  }

  async findByEmail(email: string) {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }
}
