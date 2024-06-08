import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "~/repositories/prisma/PrismaUserRepository";
import { AuthenticateService } from "~/services/Authenticate";
import { InvalidCredentialsError } from "~/services/_errors";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  let authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  let { email, password } = authenticateSchema.parse(req.body);

  try {
    const userRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateService(userRepository);

    await authenticateService.execute({ email, password });

    return res.status(200).send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }
}
