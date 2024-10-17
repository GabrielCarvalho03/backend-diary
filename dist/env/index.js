"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEnv = void 0;
const dotenv_1 = require("dotenv");
require("dotenv/config");
const zod_1 = require("zod");
if (process.env.NODE_ENV !== "production") {
    (0, dotenv_1.config)({ path: ".env.test" });
}
else {
    (0, dotenv_1.config)();
}
const EnvSchema = zod_1.z.object({
    STRIPE_SECRET_KEY: zod_1.z.string(),
    STRIPE_PUBLIC_KEY: zod_1.z.string(),
    STRIPE_WEBHOOK_SECRET: zod_1.z.string(),
    STRIPE_PRICE_BASIC: zod_1.z.string(),
    STRIPE_PRICE_PREMIUM: zod_1.z.string(),
    FIREBASE_API_KEY: zod_1.z.string(),
    FIREBASE_TYPE: zod_1.z.string(),
    FIREBASE_PROJECT_ID: zod_1.z.string(),
    FIREBASE_PRIVATE_KEY_ID: zod_1.z.string(),
    FIREBASE_PRIVATE_KEY: zod_1.z.string(),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string(),
    FIREBASE_CLIENT_ID: zod_1.z.string(),
    FIREBASE_AUTH_URI: zod_1.z.string(),
    FIREBASE_TOKEN_URI: zod_1.z.string(),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: zod_1.z.string(),
    FIREBASE_CLIENT_X509_CERT_URL: zod_1.z.string(),
    FIREBASE_UNIVERSE_DOMAIN: zod_1.z.string(),
});
const _env = EnvSchema.safeParse(process.env);
if (!_env.success) {
    console.error("❗❗ Error parsing environment variables", _env.error);
    throw new Error(`❌Invalid environment variables`);
}
exports.processEnv = _env.data;
