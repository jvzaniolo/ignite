import { Prisma, type User } from "@prisma/client";
import { db } from "~/lib/db";
import type { IUserRepository } from "../UserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await db.user.create({ data });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  }
}
