import "server-only";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    // NextAuth
    NEXTAUTH_SECRET: z.string().min(32),
    NEXTAUTH_URL: z.string().url(),
    // OAuth
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    FACEBOOK_CLIENT_ID: z.string().min(1),
    FACEBOOK_CLIENT_SECRET: z.string().min(1),
    // Payfort
    PAYFORT_MERCHANT_IDENTIFIER: z.string().min(1),
    PAYFORT_ACCESS_CODE: z.string().min(1),
    PAYFORT_SHA_REQUEST_PHRASE: z.string().min(1),
    PAYFORT_SHA_RESPONSE_PHRASE: z.string().min(1),
    PAYFORT_BASE_URL: z.string().url(),
    // API
    API_BASE_URL: z.string().url(),
    API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
