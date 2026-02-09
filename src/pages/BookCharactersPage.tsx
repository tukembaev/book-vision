import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../features/books/mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../features/books/mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../features/characters/mocks/charactersDb.mock';
import { getCatalogEntriesByBookId } from '../features/characters/mocks/characterProfilesDb.mock';

import { BookTocNav } from '../features/books/ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../features/books/ui/BookSidebar/BookSidebar';
import { CharacterCatalogCard } from '../features/characters/ui/CharacterCatalogCard/CharacterCatalogCard';

export default function BookCharactersPage() {
  const { bookId } = useParams();

  if (!bookId) {
    return null;
  }

  const book = getMockBookById(bookId);

  if (!book) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="600">
          Книга не найдена
        </Heading>
        <Text mt="2" opacity={0.8}>
          Нет книги с id: {bookId}
        </Text>
      </Box>
    );
  }

  const parts = getMockBookPartsByBookId(bookId);
  const characters = getMockBookCharactersByBookId(bookId);
  const catalogEntries = getCatalogEntriesByBookId(bookId);

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} />}
      center={
        <Stack gap="4">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Персонажи
            </Heading>
            <Text mt="1" fontSize="sm" color="gray.500">
              {catalogEntries.length} персонажей в книге «{book.title}»
            </Text>
          </Box>

          {catalogEntries.length === 0 ? (
            <Box borderWidth="1px" borderRadius="xl" p="6" textAlign="center">
              <Text color="gray.400">Персонажи пока не добавлены.</Text>
            </Box>
          ) : (
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="4">
              {catalogEntries.map((entry) => (
                <CharacterCatalogCard key={entry.id} entry={entry} />
              ))}
            </Grid>
          )}
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
