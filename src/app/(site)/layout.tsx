// src/app/(site)/layout.tsx
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WelcomeModal } from "@/components/welcome-modal";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <WelcomeModal />
      <ScrollToTop />
    </>
  );
}
