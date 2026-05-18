// src/utils/formatters.ts
//
// Pure utility functions used across the entire app.
// "Pure" means they take an input and return an output
// with no side effects — same input always gives same output.
// These are easy to test and easy to reuse anywhere.

// Formats a number as Nigerian Naira currency.
// 4200000 → "₦4,200,000"
// 985000  → "₦985,000"

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Formats large numbers into compact form for stat cards.
// 4200000 → "₦4.2M"
// 985000  → "₦985K"
// 1800000 → "₦1.8M"

export function formatNairaCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}K`;
  }
  return `₦${amount}`;
}

// Converts an ISO timestamp into a human-readable relative time.
// "2 hours ago", "yesterday", "3 days ago"
// This is much friendlier than showing raw dates in the activity feed.
export function timeAgo(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));


  if (diffMins < 1) return 'Just Now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if(diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays === 1) return 'yesterday';
  if(diffDays < 7) return `${diffDays} days ago`;
  return new Date(isoString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}



/// Returns initials from a full name - used in avatar fallback.
// "Adebayo Okafor" => "AO"
export function getInitials(fullName: string):string{
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
