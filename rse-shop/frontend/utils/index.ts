export const slugify = (str?: string): string | undefined => {
  if (!str) return undefined;
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '-')
    .toLowerCase();
};
