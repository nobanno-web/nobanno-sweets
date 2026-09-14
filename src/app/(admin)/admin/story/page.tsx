import { getAllStoryBlocks } from "@/features/story/services/story-block.service";
import { StoryBlocksList } from "@/features/story/components/story-blocks-list";
import { CreateStoryBlockDialog } from "@/features/story/components/create-story-block-dialog";

export default async function AdminStoryPage() {
  const blocks = await getAllStoryBlocks();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl mb-1">Story Page</h1>
          <p className="text-muted-foreground text-sm">
            Manage the alternating story blocks on your Our Story page.
          </p>
        </div>
        <CreateStoryBlockDialog />
      </div>

      <StoryBlocksList blocks={blocks} />
    </div>
  );
}
