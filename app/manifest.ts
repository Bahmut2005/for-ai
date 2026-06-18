import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Omniverse Wheel",
    short_name: "OmniverseWheel",
    description: "Spin to discover anime, manga, movies, games, and more from every universe",
    start_url: "/",
    display: "standalone",
    background_color: "#05050f",
    theme_color: "#7c3aed",
    orientation: "any",
    categories: ["entertainment", "games"],
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/icons/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        // @ts-expect-error — form_factor is valid but not yet in TS types
        form_factor: "wide",
        label: "The Omniverse Wheel desktop view",
      },
    ],
  };
}
