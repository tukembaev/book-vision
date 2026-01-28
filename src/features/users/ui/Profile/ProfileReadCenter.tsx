import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { UserProfileDashboard, UserReadingEntry } from '../../mocks/userProfileDb.mock';

export interface ProfileReadCenterProps {
  profile: UserProfileDashboard;
}

export function ProfileReadCenter({ profile }: ProfileReadCenterProps) {
  const reading = profile.reading.filter((r) => r.status === 'reading');
  const finished = profile.reading.filter((r) => r.status === 'finished');

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Прочитанные книги
        </Heading>
        <Text mt="2" opacity={0.8}>
          История чтения: читаю/прочитал и даты.
        </Text>
      </Box>

      <ReadingBlock title="Читаю сейчас" items={reading} emptyText="Пока нет активного чтения (mock)." />
      <ReadingBlock title="Прочитал" items={finished} emptyText="Пока нет прочитанных книг (mock)." />
    </Stack>
  );
}

function ReadingBlock({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: UserReadingEntry[];
  emptyText: string;
}) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        {title}
      </Heading>

      {items.length === 0 ? (
        <Text mt="2" opacity={0.8}>
          {emptyText}
        </Text>
      ) : (
        <Stack mt="3" gap="3">
          {items.map((r) => {
            const book = getMockBookById(r.bookId);

            return (
              <Box key={`${r.bookId}-${r.startedAt}`} borderWidth="1px" borderRadius="md" p="3">
                <Heading as="h4" size="xs" fontWeight="700">
                  {book?.title ?? `Книга ${r.bookId}`}
                </Heading>

                <Text mt="1" fontSize="sm" opacity={0.8}>
                  Статус: {r.status === 'reading' ? 'читаю' : 'прочитал'}
                </Text>

                <Text mt="1" fontSize="sm" opacity={0.75}>
                  Даты: {r.startedAt}
                  {r.finishedAt ? ` → ${r.finishedAt}` : ''}
                </Text>

                <AppLink to={`/books/${r.bookId}`} mt="2" fontSize="sm" opacity={0.85}>
                  Открыть книгу
                </AppLink>
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
