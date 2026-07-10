export const COLOR_HEX = {
  default: "#FFFFFF",
  yellow: "#FFF6DE",
  pink: "#FFEAF1",
  green: "#E6F8EC",
  blue: "#E8F1FF",
  purple: "#F2ECFF",
};

export const COLOR_DOTS = [
  { name: "default", swatch: "#FFFFFF" },
  { name: "yellow", swatch: "#FFE9A8" },
  { name: "pink", swatch: "#FFD3E0" },
  { name: "green", swatch: "#CDEFD8" },
  { name: "blue", swatch: "#D3E4FF" },
  { name: "purple", swatch: "#E6DBFF" },
];

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
