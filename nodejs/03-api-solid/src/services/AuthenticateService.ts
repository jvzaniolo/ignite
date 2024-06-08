import { compare } from "bcryptjs";
import type { IUserRepository } from "~/repositories/UserRepository";
import { InvalidCredentialsError } from "./_errors";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: AuthenticateServiceRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    const isPasswordValid = await compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    return { user };
  }
}
