import type { NextConfig } from "next";
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  // The embedded preview uses this loopback host instead of localhost.
  allowedDevOrigins: ["127.0.0.1"],
};
export default config;
