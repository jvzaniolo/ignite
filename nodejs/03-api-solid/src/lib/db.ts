import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export let db = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query"] : [],
});
