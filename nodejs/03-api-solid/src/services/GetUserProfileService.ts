import type { User } from "@prisma/client";
import type { IUserRepository } from "~/repositories/UserRepository";
import { ResourceNotFoundError } from "./_errors";

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
      throw new ResourceNotFoundError("User not found");
    }

    return { user };
  }
}
