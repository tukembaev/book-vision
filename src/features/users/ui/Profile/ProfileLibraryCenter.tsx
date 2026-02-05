import { Box, Flex, Heading, Stack, Tabs, Text } from '@chakra-ui/react';
import { Calendar, CheckCircle, Eye, PauseCircle, XCircle } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';

export interface ProfileLibraryCenterProps {
  profile: UserProfileDashboard;
}

type LibraryTabKey = 'planned' | 'reading_now' | 'completed' | 'onHold' | 'dropped';

const libraryTabs: Array<{ key: LibraryTabKey; title: string; icon: React.ComponentType<{ size?: number | string }> }> = [
  { key: 'planned', title: 'В планах', icon: Calendar },
  { key: 'reading_now', title: 'Читаю', icon: Eye },
  { key: 'completed', title: 'Прочитано', icon: CheckCircle },
  { key: 'onHold', title: 'Отложено', icon: PauseCircle },
  { key: 'dropped', title: 'Брошено', icon: XCircle },
];

export function ProfileLibraryCenter({ profile }: ProfileLibraryCenterProps) {
  const counts: Record<LibraryTabKey, number> = {
    planned: profile.library.filter((x) => x.status === 'planned').length,
    reading_now: profile.library.filter((x) => x.status === 'reading_now').length,
 
    completed: profile.library.filter((x) => x.status === 'completed').length,
    onHold: profile.library.filter((x) => x.status === 'onHold').length,
    dropped: profile.library.filter((x) => x.status === 'dropped').length,
  };

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Библиотека
        </Heading>
      </Box>

      <Tabs.Root defaultValue={libraryTabs[0]?.key ?? 'planned'} variant="outline">
        <Tabs.List  overflowX="auto" overflowY="hidden">
          {libraryTabs.map((t) => (
            <Tabs.Trigger key={t.key} value={t.key}>
              <Flex align="center" gap="2">
                <Box as="span" fontSize="sm" lineHeight="1">
                  <t.icon size={16} />
                </Box>
                <Text>{t.title}</Text>
                <Box
                  as="span"
                  ml="1"
                  px="2"
                  py="0.5"
                  borderRadius="full"
                  borderWidth="1px"
                  fontSize="xs"
                  opacity={0.85}
                >
                  {counts[t.key]}
                </Box>
              </Flex>
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>

        {libraryTabs.map((t) => {
          const items = profile.library.filter((x) => x.status === t.key);

          return (
            <Tabs.Content key={t.key} value={t.key} pt="4">
              {items.length === 0 ? (
                <Text opacity={0.8}>Пока пусто (mock).</Text>
              ) : (
                <Stack gap="3">
                  {items.map((x) => {
                    const book = getMockBookById(x.bookId);

                    return (
                      <Box key={`${t.key}-${x.bookId}`} borderWidth="1px" borderRadius="md" p="3">
                        <Heading as="h4" size="xs" fontWeight="700">
                          {book?.title ?? `Книга ${x.bookId}`}
                        </Heading>
                        <AppLink to={`/books/${x.bookId}`} mt="2" fontSize="sm" opacity={0.85}>
                          Открыть книгу
                        </AppLink>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Stack>
  );
}
