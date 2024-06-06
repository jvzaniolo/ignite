import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT,
    host: "127.0.0.1",
  })
  .then((address) => {
    console.log(`🚀 Server listening on ${address}`);
  });
