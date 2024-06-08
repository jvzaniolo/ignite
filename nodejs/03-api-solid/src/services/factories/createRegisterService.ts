import { PrismaUserRepository } from "~/repositories/prisma/PrismaUserRepository";
import { RegisterService } from "../RegisterService";

export function createRegisterService() {
  const userRepository = new PrismaUserRepository();
  return new RegisterService(userRepository);
}
