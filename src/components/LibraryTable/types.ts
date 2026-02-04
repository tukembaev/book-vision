export type LibraryBookStatus = 'planned' | 'reading' | 'completed' | 'onHold' | 'dropped';

export type LibraryBookRating = 'excellent' | 'good' | 'average' | 'belowAverage' | 'poor';

export interface LibraryBookEntry {
  id: string;
  bookId: string;
  title: string;
  author: string;
  authorId: string;
  status: LibraryBookStatus;
  readDate?: string;
  rating?: LibraryBookRating;
  score?: number;
  coverUrl?: string;
  description?: string;
  year?: number;
  pagesCount?: number;
  genres?: string[];
}

export interface AuthorInfo {
  id: string;
  name: string;
  country?: string;
  birthYear?: number;
  deathYear?: number;
  bio?: string;
  booksCount?: number;
}

export const STATUS_LABELS: Record<LibraryBookStatus, string> = {
  planned: 'Запланировано',
  reading: 'Читаю',
  completed: 'Прочитано',
  onHold: 'Отложено',
  dropped: 'Брошено',
};

export const STATUS_COLORS: Record<LibraryBookStatus, string> = {
  planned: 'gray',
  reading: 'blue',
  completed: 'green',
  onHold: 'yellow',
  dropped: 'red',
};

export const RATING_LABELS: Record<LibraryBookRating, string> = {
  excellent: 'Отличная',
  good: 'Хорошая',
  average: 'Средняя',
  belowAverage: 'Ниже среднего',
  poor: 'Плохая',
};

export const RATING_COLORS: Record<LibraryBookRating, string> = {
  excellent: 'green',
  good: 'teal',
  average: 'yellow',
  belowAverage: 'orange',
  poor: 'red',
};

export type SortField = 'title' | 'author' | 'readDate' | 'rating' | 'score';
export type SortDirection = 'asc' | 'desc';

export interface LibraryTableFilter {
  status?: LibraryBookStatus[];
  rating?: LibraryBookRating[];
  author?: string;
  search?: string;
}

export interface LibraryTableSort {
  field: SortField;
  direction: SortDirection;
}
