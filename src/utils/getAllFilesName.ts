export function getAllIconPaths(): string[] {
  const icons = ['music', 'office', 'programming', 'school'];
  return icons.map((icon) => `/icons/${icon}.svg`);
}
