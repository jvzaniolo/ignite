import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import {
  RegisterService,
  UserAlreadyExistsError,
} from "@/services/RegisterService";
import { PrismaUserRepository } from "@/repositories/prisma/PrismaUserRepository";

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

    const user = await registerService.execute({ name, email, password });

    return res.status(201).send(user);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send(error.message);
    }

    throw error;
  }
}
