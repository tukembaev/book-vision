export interface SavedCollection {
  id: string;
  title: string;
  description: string;
  booksCount: number;
  createdAt: string;
}

export interface SavedDebate {
  id: string;
  title: string;
  bookTitle: string;
  participantsCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface SavedItem {
  id: string;
  type: 'quote' | 'article' | 'review';
  title: string;
  preview: string;
  bookTitle?: string;
  savedAt: string;
}

export const mockSavedCollections: SavedCollection[] = [
  {
    id: 'sc-1',
    title: 'Русская классика XIX века',
    description: 'Подборка ключевых произведений русских авторов.',
    booksCount: 8,
    createdAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'sc-2',
    title: 'Философия для начинающих',
    description: 'Книги, которые помогут разобраться в основах.',
    booksCount: 5,
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'sc-3',
    title: 'Любимые детективы',
    description: 'Классика детективного жанра.',
    booksCount: 6,
    createdAt: '2026-01-20T10:00:00.000Z',
  },
];

export const mockSavedDebates: SavedDebate[] = [
  {
    id: 'sd-1',
    title: 'Базаров — герой или антигерой?',
    bookTitle: 'Отцы и дети',
    participantsCount: 24,
    commentsCount: 67,
    createdAt: '2026-01-18T10:00:00.000Z',
  },
  {
    id: 'sd-2',
    title: 'Был ли Раскольников прав?',
    bookTitle: 'Преступление и наказание',
    participantsCount: 42,
    commentsCount: 130,
    createdAt: '2026-01-22T10:00:00.000Z',
  },
];

export const mockSavedItems: SavedItem[] = [
  {
    id: 'si-1',
    type: 'quote',
    title: 'Цитата',
    preview: '«Природа не храм, а мастерская, и человек в ней работник.»',
    bookTitle: 'Отцы и дети',
    savedAt: '2026-01-12T10:00:00.000Z',
  },
  {
    id: 'si-2',
    type: 'article',
    title: 'Почему стоит прочитать «Мастер и Маргарита»',
    preview: 'Разбор символизма и скрытых смыслов романа Булгакова.',
    bookTitle: 'Мастер и Маргарита',
    savedAt: '2026-01-14T10:00:00.000Z',
  },
  {
    id: 'si-3',
    type: 'review',
    title: 'Отзыв на «Преступление и наказание»',
    preview: 'Один из лучших психологических романов. Достоевский мастерски передаёт внутренний мир…',
    bookTitle: 'Преступление и наказание',
    savedAt: '2026-01-20T10:00:00.000Z',
  },
  {
    id: 'si-4',
    type: 'quote',
    title: 'Цитата',
    preview: '«Тварь ли я дрожащая или право имею?»',
    bookTitle: 'Преступление и наказание',
    savedAt: '2026-01-21T10:00:00.000Z',
  },
];
