// src/components/ui/Avatar.tsx
//
// Displays a user's profile photo if they have one,
// or their initials in a colored circle if they don't.
// This pattern is used by Gmail, Slack, Notion, and most modern apps.

interface AvatarProps {
  fullName: string;
  photoUrl: string | null;
  size?: "sm" | "md" | "lg"; // controls the pixel size
  className?: string;
}

// Maps size prop to Tailwind classes
const SIZE_CLASSES = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-11 h-11 text-base",
};

// Generates a consistent background color from the user's name.
// Same name always gets same color — not random on every render.
// We pick from Honda-appropriate professional colors.

function getColorsFromName(name: string): string {
  const colors = [
    "bg-red-600", // Honda red variants
    "bg-red-700",
    "bg-rose-600",
    "bg-slate-600", // Charcoal variants
    "bg-slate-700",
    "bg-zinc-600",
    "bg-stone-600",
    "bg-neutral-600",
  ];

  // Sum the char codes of the name, mod by number of colors.
  // This gives a deterministic index — same name, same color, every time.
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;

  return colors[index];
}

// Extracts initials from a full name.
// "Adebayo Okafor" → "AO"
// "Temitope" → "T"  (handles single names)

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return parts[0][0] + parts[parts.length - 1][0].toUpperCase();
}

export function Avatar({
  fullName,
  photoUrl,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClass = SIZE_CLASSES[size];
  const initials = getInitials(fullName);
  const colorClass = getColorsFromName(fullName);

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={fullName}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
        aria-lable={fullName}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white ${className}`}
    >
      {initials}
    </div>
  );
}
