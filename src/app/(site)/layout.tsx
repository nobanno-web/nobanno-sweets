// src/app/(site)/layout.tsx
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WelcomeModal } from "@/components/welcome-modal";
import { ScrollToTop } from "@/components/scroll-to-top";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import { getSettings } from "@/features/site-settings/services/site-settings.service";
import { getPrimaryLocationInfo } from "@/features/locations/services/location.service";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, primaryLocation] = await Promise.all([
    getSettings(),
    getPrimaryLocationInfo(),
  ]);

  return (
    <>
      <LocalBusinessSchema settings={settings} location={primaryLocation} />
      <Nav settings={settings} location={primaryLocation} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} location={primaryLocation} />
      <WelcomeModal settings={settings} />
      <ScrollToTop />
    </>
  );
}