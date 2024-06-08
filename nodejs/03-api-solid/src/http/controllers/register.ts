import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "~/services/_errors";
import { createRegisterService } from "~/services/factories/createRegisterService";

export async function register(req: FastifyRequest, res: FastifyReply) {
  let createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  let { name, email, password } = createUserSchema.parse(req.body);

  try {
    const registerService = createRegisterService();

    const data = await registerService.execute({ name, email, password });

    return res.status(201).send(data);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }
}
