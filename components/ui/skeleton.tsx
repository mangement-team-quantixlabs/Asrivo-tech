import { cn } from "@/lib/utils";

/**
 * Skeleton — base shimmer placeholder primitive.
 *
 * Usage:
 *   <Skeleton className="h-6 w-3/4" />
 *   <Skeleton className="h-48 w-full rounded-2xl" />
 *
 * The shimmer animation is defined globally in globals.css using
 * transform: translateX only — never triggers repaints or reflows.
 * Respects prefers-reduced-motion via the global @media query.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
