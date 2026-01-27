import type { Book, BookPart, Character } from '../../types/core';

export interface BooksState {
  list: Book[];
  currentBook?: Book;
  parts: BookPart[];
  characters: Character[];
}
