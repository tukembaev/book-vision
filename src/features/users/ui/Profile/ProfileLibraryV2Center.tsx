import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { LibraryTableV2 } from '@/components/LibraryTable';
import { mockLibraryBooks } from '@/components/LibraryTable/mocks/libraryData.mock';
import type { LibraryBookEntry } from '@/components/LibraryTable/types';

export function ProfileLibraryV2Center() {
  const [books, setBooks] = useState<LibraryBookEntry[]>(mockLibraryBooks);

  const handleBookUpdate = (bookId: string, updates: Partial<LibraryBookEntry>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, ...updates } : book))
    );
  };

  const handleBookAdd = (newBook: Omit<LibraryBookEntry, 'id'>) => {
    const id = `lb-${Date.now()}`;
    setBooks((prev) => [{ ...newBook, id } as LibraryBookEntry, ...prev]);
  };

  return (
    <Box>
      <LibraryTableV2
        books={books}
        onBookUpdate={handleBookUpdate}
        onBookAdd={handleBookAdd}
      />
    </Box>
  );
}
