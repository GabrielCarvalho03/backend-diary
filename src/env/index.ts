import { config } from "dotenv";
import "dotenv/config";
import { string, z } from "zod";

if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.test" });
} else {
  config();
}

const EnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  STRIPE_PRICE_BASIC: z.string(),
  STRIPE_PRICE_PREMIUM: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_TYPE: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_PRIVATE_KEY_ID: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_CLIENT_ID: z.string(),
  FIREBASE_AUTH_URI: z.string(),
  FIREBASE_TOKEN_URI: z.string(),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  FIREBASE_CLIENT_X509_CERT_URL: z.string(),
  FIREBASE_UNIVERSE_DOMAIN: z.string(),
  ORIGIN_URL: z.string(),
});

const _env = EnvSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❗❗ Error parsing environment variables", _env.error);
  throw new Error(`❌Invalid environment variables`);
}

export const processEnv = _env.data;
