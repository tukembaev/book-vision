import type { Quote } from '@/types/core';

export const mockQuotesDb: Quote[] = [
  {
    id: 'q1',
    userId: 'u1',
    bookId: '1',
    partId: 'p1',
    text: '«Природа не храм, а мастерская.»',
    createdAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'q2',
    userId: 'u2',
    bookId: '2',
    partId: 'p2',
    text: '«Страдание и боль всегда обязательны для широкого сознания и глубокого сердца.»',
    createdAt: '2026-01-11T10:00:00.000Z',
  },
  {
    id: 'q3',
    userId: 'u3',
    bookId: '3',
    text: '«Рукописи не горят.»',
    createdAt: '2026-01-12T10:00:00.000Z',
  },
];

export function getMockQuotes() {
  return [...mockQuotesDb];
}

export function getMockQuoteById(quoteId: string) {
  return mockQuotesDb.find((q) => q.id === quoteId);
}

export function searchMockQuotes(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [];
  }

  return getMockQuotes().filter((quote) => quote.text.toLowerCase().includes(q));
}
