import { Prisma, type User } from "@prisma/client";
import type { IUserRepository } from "../UserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      ...data,
      id: "usr_" + this.users.length + 1,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user ? user : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user ? user : null;
  }
}
