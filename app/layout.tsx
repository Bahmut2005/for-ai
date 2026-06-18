import type { Metadata } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/NavBar";
import { Starfield } from "@/components/Starfield";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Omniverse Wheel",
    template: "%s | The Omniverse Wheel",
  },
  description:
    "A cinematic spinning wheel for discovering anime, manga, movies, games, comics, and fictional media from across the universe — a continuously expanding catalogue of over 300+ titles and growing.",
  keywords: [
    "anime",
    "manga",
    "movies",
    "games",
    "comics",
    "random",
    "wheel",
    "roulette",
    "discovery",
    "entertainment",
  ],
  openGraph: {
    title: "The Omniverse Wheel",
    description: "Spin the wheel. Discover a universe of fiction.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable} font-body`}
      >
        <Providers>
          <Starfield />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-glass-border py-6 text-center text-sm text-white/40">
              <p>
                The Omniverse Wheel — a continuously expanding catalogue of fictional media.
                No database can contain every work ever created, but we keep trying.
              </p>
              <p className="mt-1">
                Data sourced from AniList, TMDB, Jikan, and other open databases.
                All rights belong to their respective creators.
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
