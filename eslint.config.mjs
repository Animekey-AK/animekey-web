import nextConfig from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // Ignore nested git worktrees (animekey-v2-ANI-XXX/) and build output
  { ignores: ["animekey-v2-*/", ".next/", "out/"] },
  ...nextConfig,
];

export default config;
