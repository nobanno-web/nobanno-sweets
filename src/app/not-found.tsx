import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="font-heading font-bold text-4xl mb-3">404</h1>
      <p className="text-muted-foreground text-sm mb-6">
        This page doesn't exist.
      </p>
      <Link
        href="/"
        className="rounded-full bg-primary px-6 py-2 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
