import { hash } from "bcryptjs";
import type { IUserRepository } from "~/repositories/UserRepository";
import { UserAlreadyExistsError } from "./_errors";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const hasUser = await this.userRepository.findByEmail(email);

    if (hasUser) {
      throw new UserAlreadyExistsError("User already exists");
    }

    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    return { user };
  }
}
