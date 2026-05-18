// src/components/dashboard/SkeletonCard.tsx
//
// A skeleton loader is an animated placeholder shown while real data loads.
// It mimics the shape of the content that's coming, so the page
// doesn't feel blank or broken during a network request.
// This is far better UX than a spinner — users know what's coming.

// The shimmer animation is defined in index.css (we'll add it next).

interface SkeletonCardProps {
  height?: string; // Tailwind height class e.g. 'h-32'
}

export function SkeletonCard({ height = "h-32" }: SkeletonCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 ${height} overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-shimmer bg-[length:200%_100%]"></div>
    </div>
  );
}

// Skeleton for a stat card specifically
export function SkeletonStatsCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-shimmer bg-[length:200%_100%]" />
      <div className="relative space-y-3">
        <div className="w-10 h-10 bg-gray-100 rounded-xl" />
        <div className="w-24 h-7 bg-gray-100 rounded-lg" />
        <div className="w-32 h-4 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
