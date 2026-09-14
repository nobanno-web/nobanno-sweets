import { getSettings } from "@/features/site-settings/services/site-settings.service";
import { getAllShopStats } from "@/features/site-settings/services/shop-stat.service";
import { SiteSettingsForm } from "@/features/site-settings/components/site-settings-form";
import { ShopStatsManager } from "@/features/site-settings/components/shop-stats-manager";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  const stats = await getAllShopStats();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl mb-1">Site Settings</h1>
        <p className="text-muted-foreground text-sm">
          Social links, welcome modal, owner info, and homepage stats.
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-card border-2 border-foreground rounded-2xl p-6">
          <SiteSettingsForm settings={settings} />
        </div>

        <div className="bg-card border-2 border-foreground rounded-2xl p-6">
          <ShopStatsManager stats={stats} />
        </div>
      </div>
    </div>
  );
}
