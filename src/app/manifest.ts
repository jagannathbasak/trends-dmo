import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Prediction Intelligence`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0F0E",
    theme_color: "#0A0F0E",
    icons: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "774x774",
        type: "image/png",
      },
    ],
  };
}
