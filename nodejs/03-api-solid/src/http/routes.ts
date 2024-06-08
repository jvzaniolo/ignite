import type { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { getUserProfile } from "./controllers/get-user-profile";
import { register } from "./controllers/register";

export async function routes(app: FastifyInstance) {
  app.post("/users", register);
  app.get("/users/:id", getUserProfile);

  app.post("/sessions", authenticate);
}
