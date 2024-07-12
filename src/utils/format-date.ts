export function formatDate(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale ?? 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
