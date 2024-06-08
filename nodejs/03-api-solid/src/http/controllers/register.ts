import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "~/repositories/prisma/PrismaUserRepository";
import { RegisterService } from "~/services/RegisterService";
import { UserAlreadyExistsError } from "~/services/_errors";

export async function register(req: FastifyRequest, res: FastifyReply) {
  let createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  let { name, email, password } = createUserSchema.parse(req.body);

  try {
    const userRepository = new PrismaUserRepository();
    const registerService = new RegisterService(userRepository);

    const data = await registerService.execute({ name, email, password });

    return res.status(201).send(data);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }
}
