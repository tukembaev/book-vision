import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  type BoxProps,
} from '@chakra-ui/react';
import { useMemo, useState, type ReactNode } from 'react';

import { AppLink } from "../AppLink/AppLink";

import { mockBooksDb } from '@/features/books/mocks/booksDb.mock';
import { mockCharacterProfilesDb } from '@/features/characters/mocks/characterProfilesDb.mock';
import { searchMockQuotes } from '@/features/quotes/mocks/quotesDb.mock';

export interface GlobalSearchProps extends BoxProps {
  placeholder?: string;
}

export function GlobalSearch({ placeholder = 'Поиск…', ...props }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      return {
        books: [],
        characters: [],
        quotes: [],
      };
    }

    const books = mockBooksDb
      .filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
      .slice(0, 5);

    const characters = mockCharacterProfilesDb
      .filter((c) => c.name.toLowerCase().includes(q) || c.aliases.some((a) => a.toLowerCase().includes(q)))
      .slice(0, 5);

    const quotes = searchMockQuotes(q).slice(0, 5);

    return { books, characters, quotes };
  }, [query]);

  const hasAny =
    results.books.length > 0 || results.characters.length > 0 || results.quotes.length > 0;

  return (
    <Box position="relative" {...props}>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // small delay to allow click
          window.setTimeout(() => setIsOpen(false), 120);
        }}
        placeholder={placeholder}
        size="sm"
        w={{ base: '220px', md: '280px' }}
      />

      {isOpen && query.trim().length >= 2 ? (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          right="0"
          w={{ base: '320px', md: '420px' }}
          borderWidth="1px"
          borderRadius="md"
          bg="bg"
          p="3"
          zIndex={50}
        >
          {!hasAny ? (
            <Text fontSize="sm" opacity={0.8}>
              Ничего не найдено.
            </Text>
          ) : (
            <Stack gap="3">
              <SearchSection title="Книги" emptyText="Нет книг">
                {results.books.map((b) => (
                  <SearchRow key={b.id} to={`/books/${b.id}`} title={b.title} meta={b.author} />
                ))}
              </SearchSection>

              <SearchSection title="Персонажи" emptyText="Нет персонажей">
                {results.characters.map((c) => (
                  <SearchRow
                    key={c.id}
                    to={`/characters/${c.id}`}
                    title={c.name}
                    meta={c.aliases.filter((a) => a && a !== '—').join(', ') || '—'}
                  />
                ))}
              </SearchSection>

              <SearchSection title="Цитаты" emptyText="Нет цитат">
                {results.quotes.map((q) => (
                  <SearchRow
                    key={q.id}
                    to={`/books/${q.bookId}`}
                    title={q.text}
                    meta={`Книга: ${q.bookId}`}
                  />
                ))}
              </SearchSection>
            </Stack>
          )}
        </Box>
      ) : null}
    </Box>
  );
}

function SearchSection({
  title,
  emptyText,
  children,
}: {
  title: string;
  emptyText: string;
  children: ReactNode;
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <Box>
      <Heading as="h4" size="xs" fontWeight="600">
        {title}
      </Heading>
      {hasChildren ? <Stack mt="2" gap="2">{children}</Stack> : <Text mt="2" fontSize="sm" opacity={0.75}>{emptyText}</Text>}
    </Box>
  );
}

function SearchRow({
  to,
  title,
  meta,
}: {
  to: string;
  title: string;
  meta?: string;
}) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="2">
      <AppLink to={to} fontWeight="600" fontSize="sm">
        {title}
      </AppLink>
      {meta ? (
        <Text mt="1" fontSize="xs" opacity={0.7}>
          {meta}
        </Text>
      ) : null}
    </Box>
  );
}
