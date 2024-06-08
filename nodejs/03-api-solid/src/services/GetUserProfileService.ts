import type { User } from "@prisma/client";
import type { IUserRepository } from "~/repositories/UserRepository";
import { UserNotFoundError } from "./_errors";

interface GetUserProfileServiceRequest {
  userId: string;
}

interface GetUserProfileServiceResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    data: GetUserProfileServiceRequest
  ): Promise<GetUserProfileServiceResponse> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    return { user };
  }
}
