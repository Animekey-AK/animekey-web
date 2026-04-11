const ENV = {
  dev: {
    apiBaseUrl: "http://localhost:9001",
  },
  staging: {
    apiBaseUrl: "https://api-staging.animekey.tv",
  },
  production: {
    apiBaseUrl: "https://prodapi.animekey.tv",
  },
} as const;

// Switch via app.json extra.env or EAS build profile
const buildEnv = (process.env.EXPO_PUBLIC_ENV ?? "dev") as keyof typeof ENV;

export const config = {
  ...(ENV[buildEnv] ?? ENV.dev),
  apiBasicAuth:
    process.env.EXPO_PUBLIC_API_BASIC_AUTH ??
    "Basic QU5LX1VTUjpBTktfUFdE",
};
