// src/app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h1 className="font-heading font-bold text-4xl mb-3">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Please refresh the page, or try again shortly.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-full bg-primary px-6 py-2 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
