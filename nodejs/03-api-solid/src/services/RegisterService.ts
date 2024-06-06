import { hash } from "bcryptjs";
import type { IUserRepository } from "@/repositories/UserRepository";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyExistsError("User already exists");
    }

    return await this.userRepository.create({ name, email, passwordHash });
  }
}

export class UserAlreadyExistsError extends Error {}
