import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Anton, Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

// ─── Fonts — matched to Figma (phone-site-animekey) ─────────────────────────
// Primary UI font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Hero / display titles (e.g. "Devil May Cry" heading)
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Description / body copy
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-description",
  display: "swap",
});

// Monospace (code, timestamps)
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "AnimeKey",
    template: "%s | AnimeKey",
  },
  description: "Stream anime, movies, and series — anytime, anywhere.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${montserrat.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
