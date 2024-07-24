export function formatDate(date: Date | string, locale?: string): string {
  return new Date(date).toLocaleDateString(locale ?? 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
