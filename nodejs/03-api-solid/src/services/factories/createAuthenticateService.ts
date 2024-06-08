import { PrismaUserRepository } from "~/repositories/prisma/PrismaUserRepository";
import { AuthenticateService } from "../Authenticate";

export function createAuthenticateService() {
  const userRepository = new PrismaUserRepository();
  return new AuthenticateService(userRepository);
}
