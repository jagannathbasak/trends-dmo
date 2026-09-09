import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This build ships the dashboard only, so the root path has no page of its
  // own. Send it to the dashboard, which is also where the in-app "NVILE" and
  // "Back to site" links point.
  redirects() {
    return [{ source: "/", destination: "/dashboard", permanent: false }];
  },
};

export default nextConfig;
