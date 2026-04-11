// Utility for conditionally joining Tailwind class names.
// Mirror of the web app's lib/utils.ts cn() helper.
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
