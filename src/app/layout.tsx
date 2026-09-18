// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nobannosweets.com"),
  title: {
    default: "Nobanno Sweets",
    template: "%s | Nobanno Sweets",
  },
  openGraph: {
    siteName: "Nobanno Sweets",
    type: "website",
    locale: "en_BD",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nobanno Sweets — Traditional Bengali Sweets, Gazipur",
      },
    ],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}