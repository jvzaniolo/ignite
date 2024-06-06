import "dotenv/config";
import { z } from "zod";

let envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

let result = envSchema.safeParse(process.env);

if (!result.success) {
  console.log("Invalid environment variables:", result.error.format());
  process.exit(1);
}

export let env = result.data;
