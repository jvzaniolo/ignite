import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { IUserRepository } from "../UserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await db.user.create({ data });
    return user;
  }

  async findByEmail(email: string) {
    console.log("findByEmail", email);
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }
}
