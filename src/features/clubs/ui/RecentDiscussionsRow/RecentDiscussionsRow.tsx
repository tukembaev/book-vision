import { Badge, Box, Flex, Grid, Heading, HStack, Text } from '@chakra-ui/react';
import { MessageSquareIcon, PinIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { ClubDiscussion } from '../../mocks/bookClubsDb.mock';

export interface RecentDiscussionsRowProps {
  discussions: (ClubDiscussion & { clubName: string })[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'только что';
  if (hours < 24) return `${hours}ч назад`;
  const days = Math.floor(hours / 24);
  return `${days}д назад`;
}

export function RecentDiscussionsRow({ discussions }: RecentDiscussionsRowProps) {
  if (discussions.length === 0) return null;

  return (
    <Box>
      <Heading as="h3" fontSize="lg" fontWeight="700" mb="1">
        🔥 Последние обсуждения
      </Heading>
      <Text fontSize="sm" color="gray.500" mb="4">
        Активные дискуссии из разных клубов
      </Text>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="3">
        {discussions.map((d) => {
          const book = d.bookId ? getMockBookById(d.bookId) : null;

          return (
            <AppLink key={d.id} to={`/clubs/${d.clubId}`} display="block" _hover={{ textDecoration: 'none' }}>
              <Box
                borderWidth="1px"
                borderRadius="xl"
                p="4"
                bg="white"
                _hover={{ shadow: 'sm' }}
                transition="all 0.2s"
                h="100%"
              >
                <Flex direction="column" gap="2" h="100%">
                  <Flex align="center" gap="2">
                    {d.pinned && <PinIcon size={12} color="var(--chakra-colors-orange-400)" />}
                    <Text fontSize="xs" color="gray.400" fontWeight="500">
                      {d.clubName}
                    </Text>
                  </Flex>

                  <Text fontSize="sm" fontWeight="700" lineHeight="short">
                    {d.title}
                  </Text>

                  {book && (
                    <Badge variant="outline" fontSize="2xs" alignSelf="flex-start" textTransform="none">
                      {book.title}
                    </Badge>
                  )}

                  <HStack gap="3" fontSize="xs" color="gray.400" mt="auto" pt="1">
                    <HStack gap="0.5">
                      <MessageSquareIcon size={12} />
                      <Text>{d.messagesCount}</Text>
                    </HStack>
                    <Text>{timeAgo(d.lastActivityAt)}</Text>
                  </HStack>
                </Flex>
              </Box>
            </AppLink>
          );
        })}
      </Grid>
    </Box>
  );
}
