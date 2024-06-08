import { PrismaUserRepository } from "~/repositories/prisma/PrismaUserRepository";
import { GetUserProfileService } from "../GetUserProfileService";

export function createGetUserProfileService() {
  const userRepository = new PrismaUserRepository();
  return new GetUserProfileService(userRepository);
}
