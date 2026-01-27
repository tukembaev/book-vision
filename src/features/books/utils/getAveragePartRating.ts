import type { BookPart } from '@/types/core';

export function getAveragePartRating(parts: BookPart[]) {
  if (!parts.length) return undefined;

  const sum = parts.reduce((acc, p) => acc + (p.averageRating ?? 0), 0);

  return Math.round((sum / parts.length) * 10) / 10;
}
