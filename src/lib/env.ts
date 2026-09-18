import { z } from "zod";

/**
 * Padrão 07Dev (lib/env.ts): validação única do ambiente.
 * Nenhum secret é exigido — a landing não possui backend.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional()
});

export const env = envSchema.parse(process.env);

export function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
