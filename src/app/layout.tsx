// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WelcomeModal } from "@/components/welcome-modal";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "sonner";

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
  title: {
    default: "Nabanno Sweets | Traditional Bengali Mishti in [City]",
    template: "%s | Nabanno Sweets",
  },
  description:
    "Handcrafted Bengali sweets made fresh daily — sandesh, rosogolla, and traditional mishti at Nabanno Sweets.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <WelcomeModal />
          <ScrollToTop />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}