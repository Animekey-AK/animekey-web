import "server-only";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    // NextAuth v5
    AUTH_SECRET: z.string().min(32),
    AUTH_URL: z.url().optional(), // auto-detected in dev
    // OAuth — optional; providers are skipped when not configured
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    FACEBOOK_CLIENT_ID: z.string().min(1).optional(),
    FACEBOOK_CLIENT_SECRET: z.string().min(1).optional(),
    // Payfort
    PAYFORT_MERCHANT_IDENTIFIER: z.string().min(1),
    PAYFORT_ACCESS_CODE: z.string().min(1),
    PAYFORT_SHA_REQUEST_PHRASE: z.string().min(1),
    PAYFORT_SHA_RESPONSE_PHRASE: z.string().min(1),
    PAYFORT_BASE_URL: z.string().url(),
    // API
    API_BASE_URL: z.string().url(),
    API_KEY: z.string().min(1),
    // Guest session — Basic Auth credentials, server-side only (fixes ANI-6)
    GUEST_BASIC_USER: z.string().min(1),
    GUEST_BASIC_PASS: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
