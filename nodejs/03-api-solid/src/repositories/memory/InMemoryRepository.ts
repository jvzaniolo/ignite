import { Prisma, User } from "@prisma/client";
import { UserAlreadyExistsError } from "~/services/RegisterService";
import { IUserRepository } from "../UserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const hasUser = await this.findByEmail(data.email);

    if (hasUser) {
      throw new UserAlreadyExistsError("User already exists");
    }

    const user = {
      ...data,
      id: "usr_" + this.users.length + 1,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user ? user : null;
  }
}
