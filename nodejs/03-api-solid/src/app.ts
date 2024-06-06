import fastify from "fastify";
import { routes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export let app = fastify();

app.register(routes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send(error.format());
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Log error to Sentry
  }

  return reply.status(500).send("Internal Server Error");
});
