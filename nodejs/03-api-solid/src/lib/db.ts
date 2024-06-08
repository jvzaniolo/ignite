import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

export let db = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query"] : [],
});
