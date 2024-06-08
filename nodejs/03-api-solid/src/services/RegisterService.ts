import type { User } from "@prisma/client";
import { hash } from "bcryptjs";
import type { IUserRepository } from "~/repositories/UserRepository";
import { UserAlreadyExistsError } from "./_errors";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    data: RegisterServiceRequest
  ): Promise<RegisterServiceResponse> {
    const hasUser = await this.userRepository.findByEmail(data.email);

    if (hasUser) {
      throw new UserAlreadyExistsError("User already exists");
    }

    const passwordHash = await hash(data.password, 6);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return { user };
  }
}
