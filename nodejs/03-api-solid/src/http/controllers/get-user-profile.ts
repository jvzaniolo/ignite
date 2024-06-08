import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserNotFoundError } from "~/services/_errors";
import { createGetUserProfileService } from "~/services/factories/createGetUserProfileService";

export async function getUserProfile(req: FastifyRequest, res: FastifyReply) {
  let getUserProfileSchema = z.object({
    userId: z.string(),
  });

  let { userId } = getUserProfileSchema.parse(req.body);

  try {
    const getUserProfileService = createGetUserProfileService();

    const data = await getUserProfileService.execute({ userId });

    return res.status(200).send(data);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }
}
