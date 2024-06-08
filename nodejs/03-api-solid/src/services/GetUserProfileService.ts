import type { IUserRepository } from "~/repositories/UserRepository";
import { UserNotFoundError } from "./_errors";

interface GetUserProfileServiceRequest {
  userId: string;
}

export class GetUserProfileService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId }: GetUserProfileServiceRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    return { user };
  }
}
