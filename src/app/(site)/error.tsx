"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h2 className="font-heading font-bold text-2xl mb-3">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Please try again, or come back in a moment.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-primary px-6 py-2 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
