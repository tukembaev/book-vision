import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { getMockCharacterProfileById } from '@/features/characters/mocks/characterProfilesDb.mock';
import { getMockQuoteById } from '@/features/quotes/mocks/quotesDb.mock';
import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';

export interface ProfileFavoritesCenterProps {
  profile: UserProfileDashboard;
}

export function ProfileFavoritesCenter({ profile }: ProfileFavoritesCenterProps) {
  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Избранное
        </Heading>
        <Text mt="2" opacity={0.8}>
          Книги, персонажи и цитаты (mock).
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Книги
        </Heading>
        {profile.favorites.bookIds.length === 0 ? (
          <Text mt="2" opacity={0.8}>
            Пока пусто.
          </Text>
        ) : (
          <Stack mt="3" gap="2">
            {profile.favorites.bookIds.map((id) => {
              const b = getMockBookById(id);
              return (
                <Box key={id} borderWidth="1px" borderRadius="md" p="3">
                  <AppLink to={`/books/${id}`} fontWeight="700">
                    {b?.title ?? `Книга ${id}`}
                  </AppLink>
                  <Text mt="1" fontSize="sm" opacity={0.75}>
                    {b?.author ?? '—'}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Персонажи
        </Heading>
        {profile.favorites.characterIds.length === 0 ? (
          <Text mt="2" opacity={0.8}>
            Пока пусто.
          </Text>
        ) : (
          <Stack mt="3" gap="2">
            {profile.favorites.characterIds.map((id) => {
              const c = getMockCharacterProfileById(id);
              return (
                <Box key={id} borderWidth="1px" borderRadius="md" p="3">
                  <AppLink to={`/characters/${id}`} fontWeight="700">
                    {c?.name ?? `Персонаж ${id}`}
                  </AppLink>
                  <Text mt="1" fontSize="sm" opacity={0.75}>
                    Книга: {c?.bookId ?? '—'}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Цитаты
        </Heading>
        {profile.favorites.quoteIds.length === 0 ? (
          <Text mt="2" opacity={0.8}>
            Пока пусто.
          </Text>
        ) : (
          <Stack mt="3" gap="2">
            {profile.favorites.quoteIds.map((id) => {
              const q = getMockQuoteById(id);
              return (
                <Box key={id} borderWidth="1px" borderRadius="md" p="3">
                  <Text fontWeight="700">{q?.text ?? `Цитата ${id}`}</Text>
                  {q?.bookId ? (
                    <AppLink to={`/books/${q.bookId}`} mt="2" fontSize="sm" opacity={0.85}>
                      Открыть книгу
                    </AppLink>
                  ) : null}
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
