const ACTION_LABELS: Record<string, string> = {
  "product:create": "created a product",
  "product:update": "updated a product",
  "product:delete": "deleted a product",
  "gallery:create": "added a gallery photo",
  "gallery:delete": "deleted a gallery photo",
  "gallery:reorder": "reordered gallery photos",
  "hero-slide:create": "created a hero slide",
  "hero-slide:update": "updated a hero slide",
  "hero-slide:delete": "deleted a hero slide",
  "hero-slide:reorder": "reordered hero slides",
  "location:create": "added a location",
  "location:update": "updated a location",
  "location:delete": "deleted a location",
  "location:set_primary": "set the main branch",
  "story-block:create": "added a story block",
  "story-block:update": "updated a story block",
  "story-block:delete": "deleted a story block",
  "story-block:reorder": "reordered story blocks",
  "site-settings:update": "updated site settings",
  "shop-stat:create": "added a stat",
  "shop-stat:update": "updated a stat",
  "shop-stat:delete": "deleted a stat",
  "shop-stat:reorder": "reordered stats",
  "member:create": "created a member",
  "member:role_change": "changed a member's role",
  "member:activate": "reactivated a member",
  "member:deactivate": "deactivated a member",
};

export function formatAction(action: string): string {
  return ACTION_LABELS[action] ?? action;
}
