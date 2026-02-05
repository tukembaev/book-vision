import { Badge, Box, HStack, IconButton, Table, Text } from '@chakra-ui/react';
import { useMemo, useState, type ReactNode } from 'react';
import { AuthorField, DateField, RatingBadge, ScoreSlider } from './fields';
import { AddBookForm } from './forms';
import { AuthorPopover, BookPopover } from './popovers';
import { LibraryTableToolbar } from './toolbar';
import { Calendar, CheckCircle, Eye, LucidePlus, PauseCircle, XCircle } from 'lucide-react';
import type {
  LibraryBookEntry,
  LibraryBookRating,
  LibraryBookStatus,
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
  const [activeStatusTab, setActiveStatusTab] = useState<LibraryBookStatus>('completed');

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    const isCompactStatus =
      activeStatusTab === 'planned' || activeStatusTab === 'reading' || activeStatusTab === 'onHold';

    if (activeStatusTab) {
      result = result.filter((book) => book.status === activeStatusTab);
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower)
      );
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
          comparison = (
            (isCompactStatus ? a.addedDate : a.readDate) ?? ''
          ).localeCompare((isCompactStatus ? b.addedDate : b.readDate) ?? '');
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
  }, [books, activeStatusTab, filter, sort]);

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

  const handleAddedDateChange = (bookId: string, addedDate: string) => {
    handleBookUpdate(bookId, { addedDate });
  };

  const handleAuthorChange = (bookId: string, authorId: string, author: string) => {
    handleBookUpdate(bookId, { authorId, author });
  };

  const handleAddBook = (book: Omit<LibraryBookEntry, 'id'>) => {
    onBookAdd?.(book);
  };

  const compactView =
    activeStatusTab === 'planned' || activeStatusTab === 'reading' || activeStatusTab === 'onHold';

  const statusTabs: Array<{
    status: LibraryBookStatus;
    label: string;
    icon: ReactNode;
  }> = [
    { status: 'completed', label: 'Прочитано', icon: <CheckCircle size={12} /> },
    { status: 'planned', label: 'В планах', icon: <Calendar size={12} /> },
    { status: 'reading', label: 'Читаю', icon: <Eye size={12} /> },
    { status: 'onHold', label: 'Отложено', icon: <PauseCircle size={12} /> },
    { status: 'dropped', label: 'Брошено', icon: <XCircle size={12} /> },
  ];

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={2}>
        <HStack gap={2} alignItems="center">
          {statusTabs.map((tab) => (
            <Badge
              key={tab.status}
              variant={activeStatusTab === tab.status ? 'solid' : 'outline'}
              size="sm"
              px={2}
              py={1}
              cursor="pointer"
              display="inline-flex"
              alignItems="center"
              gap={1}
              onClick={() => setActiveStatusTab(tab.status)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveStatusTab(tab.status);
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </Badge>
          ))}

          <IconButton
            aria-label="Добавить книгу"
            variant="ghost"
            size="xs"
            onClick={() => setAddFormOpen(true)}
          >
            <LucidePlus size={14} />
          </IconButton>

        </HStack>
        <LibraryTableToolbar
          filter={{ ...filter, status: [activeStatusTab] }}
          sort={sort}
          onFilterChange={(nextFilter) => {
            const nextStatus = nextFilter.status?.[nextFilter.status.length - 1];
            if (nextStatus) {
              setActiveStatusTab(nextStatus);
            }
            setFilter({ ...nextFilter, status: undefined });
          }}
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
                  {compactView ? (
                    <DateField
                      date={book.addedDate}
                      onChange={readonly ? undefined : (date) => handleAddedDateChange(book.id, date)}
                      readonly={readonly}
                    />
                  ) : (
                    <DateField
                      date={book.readDate}
                      onChange={readonly ? undefined : (date) => handleDateChange(book.id, date)}
                      readonly={readonly}
                    />
                  )}
                </Table.Cell>

                {!compactView && (
                  <>
                    {/* Rating badge */}
                    <Table.Cell py={2} px={2} minW="100px">
                      <RatingBadge
                        rating={book.rating}
                        onChange={
                          readonly ? undefined : (rating) => handleRatingChange(book.id, rating)
                        }
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
                  </>
                )}

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
