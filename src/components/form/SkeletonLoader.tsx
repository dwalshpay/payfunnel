export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-[--color-primary] rounded w-12" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
      </div>

      {/* Options skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-14 bg-gray-100 rounded-xl border border-[--color-border]"
          />
        ))}
      </div>
    </div>
  );
}
