import { Badge, Box, HStack, Table, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { AuthorField, DateField, RatingBadge, ScoreSlider } from './fields';
import { AddBookForm } from './forms';
import { AuthorPopover, BookPopover } from './popovers';
import { LibraryTableToolbar } from './toolbar';
import type {
  LibraryBookEntry,
  LibraryBookRating,
  LibraryTableFilter,
  LibraryTableSort
} from './types';

interface LibraryTableV2Props {
  books: LibraryBookEntry[];
  onBookUpdate?: (bookId: string, updates: Partial<LibraryBookEntry>) => void;
  onBookAdd?: (book: Omit<LibraryBookEntry, 'id'>) => void;
  readonly?: boolean;
}

export function LibraryTableV2({
  books,
  onBookUpdate,
  onBookAdd,
  readonly = false,
}: LibraryTableV2Props) {
  const [filter, setFilter] = useState<LibraryTableFilter>({});
  const [sort, setSort] = useState<LibraryTableSort>({ field: 'title', direction: 'asc' });
  const [addFormOpen, setAddFormOpen] = useState(false);

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower)
      );
    }

    if (filter.status && filter.status.length > 0) {
      result = result.filter((book) => filter.status!.includes(book.status));
    }

    if (filter.rating && filter.rating.length > 0) {
      result = result.filter((book) => book.rating && filter.rating!.includes(book.rating));
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.field) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.author.localeCompare(b.author);
          break;
        case 'readDate':
          comparison = (a.readDate ?? '').localeCompare(b.readDate ?? '');
          break;
        case 'rating':
          const ratingOrder = { excellent: 5, good: 4, average: 3, belowAverage: 2, poor: 1 };
          const aRating = a.rating ? ratingOrder[a.rating] : 0;
          const bRating = b.rating ? ratingOrder[b.rating] : 0;
          comparison = aRating - bRating;
          break;
        case 'score':
          comparison = (a.score ?? 0) - (b.score ?? 0);
          break;
      }
      return sort.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [books, filter, sort]);

  const handleBookUpdate = (bookId: string, updates: Partial<LibraryBookEntry>) => {
    onBookUpdate?.(bookId, updates);
  };



  const handleRatingChange = (bookId: string, rating: LibraryBookRating) => {
    handleBookUpdate(bookId, { rating });
  };

  const handleScoreChange = (bookId: string, score: number) => {
    handleBookUpdate(bookId, { score });
  };

  const handleDateChange = (bookId: string, readDate: string) => {
    handleBookUpdate(bookId, { readDate });
  };

  const handleAuthorChange = (bookId: string, authorId: string, author: string) => {
    handleBookUpdate(bookId, { authorId, author });
  };

  const handleAddBook = (book: Omit<LibraryBookEntry, 'id'>) => {
    onBookAdd?.(book);
  };

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={2}>
        <HStack gap={2}>
          <Badge variant="outline" size="sm" px={2} py={1}>
            ≡ Library
          </Badge>
          <Text fontSize="sm">+</Text>
        </HStack>
        <LibraryTableToolbar
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onAddClick={() => setAddFormOpen(true)}
        />
      </HStack>

      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
      >
        <Table.Root size="sm" variant="line">
          <Table.Body>
            {filteredAndSortedBooks.map((book) => (
              <Table.Row
                key={book.id}
                borderBottomWidth="1px"
              >
                {/* Book icon */}
                <Table.Cell w="40px" py={2} px={3}>
                  <Text fontSize="md">📖</Text>
                </Table.Cell>

                {/* Book title with popover */}
                <Table.Cell py={2} px={2} minW="200px">
                  <BookPopover book={book}>
                    <Box cursor="pointer">
                      <Text
                        fontSize="sm"
                        fontWeight="400"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxW="280px"
                      >
                        {book.title}
                      </Text>
                    </Box>
                  </BookPopover>
                </Table.Cell>

                {/* Author with popover */}
                <Table.Cell py={2} px={2} minW="150px">
                  <AuthorPopover authorId={book.authorId} authorName={book.author}>
                    <Box display="inline-block">
                      <AuthorField
                        author={book.author}
                        authorId={book.authorId}
                        onChange={
                          readonly
                            ? undefined
                            : (authorId, author) => handleAuthorChange(book.id, authorId, author)
                        }
                        readonly={readonly}
                      />
                    </Box>
                  </AuthorPopover>
                </Table.Cell>

                {/* Read date */}
                <Table.Cell py={2} px={2} minW="120px">
                  <DateField
                    date={book.readDate}
                    onChange={readonly ? undefined : (date) => handleDateChange(book.id, date)}
                    readonly={readonly}
                  />
                </Table.Cell>

                {/* Rating badge */}
                <Table.Cell py={2} px={2} minW="100px">
                  <RatingBadge
                    rating={book.rating}
                    onChange={readonly ? undefined : (rating) => handleRatingChange(book.id, rating)}
                    readonly={readonly}
                  />
                </Table.Cell>

                {/* Score */}
                <Table.Cell py={2} px={2} w="60px" textAlign="center">
                  <ScoreSlider
                    score={book.score}
                    onChange={readonly ? undefined : (score) => handleScoreChange(book.id, score)}
                    readonly={readonly}
                  />
                </Table.Cell>

                {/* Status badge (at the end for visual reference, but functionally it's an important field) */}
          
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {filteredAndSortedBooks.length === 0 && (
          <Box py={8} textAlign="center">
            <Text fontSize="sm">
              {filter.search || filter.status || filter.rating
                ? 'Нет книг, соответствующих фильтрам'
                : 'Библиотека пуста'}
            </Text>
          </Box>
        )}
      </Box>

      <AddBookForm
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        onSubmit={handleAddBook}
      />
    </Box>
  );
}
