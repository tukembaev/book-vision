import { Box, Flex, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { BookOpenIcon, ChevronRightIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { BookClub } from '../../mocks/bookClubsDb.mock';

export interface BookOfTheWeekProps {
  club: BookClub;
}

function useCountdown(endsAt: string) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function calc() {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('Время вышло');
        return;
      }
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const parts: string[] = [];
      if (d > 0) parts.push(`${d}д`);
      if (h > 0) parts.push(`${h}ч`);
      parts.push(`${m}м`);
      setTimeLeft(parts.join(' '));
    }

    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, [endsAt]);

  return timeLeft;
}

export function BookOfTheWeek({ club }: BookOfTheWeekProps) {
  const wb = club.weeklyBook;
  if (!wb) return null;

  const book = getMockBookById(wb.bookId);
  const nextBook = wb.nextBookId ? getMockBookById(wb.nextBookId) : null;
  const timeLeft = useCountdown(wb.endsAt);

  const readers = wb.activeReaderIds
    .map((id) => club.members.find((m) => m.userId === id))
    .filter(Boolean);

  return (
    <Box borderWidth="1px" borderRadius="2xl" bg="white" overflow="hidden" p={{ base: '5', md: '6' }}>
      <Heading as="h3" fontSize="lg" fontWeight="700" mb="4">
        <HStack gap="2">
          <BookOpenIcon size={20} />
          <Text>Книга недели</Text>
        </HStack>
      </Heading>

      <Flex direction={{ base: 'column', lg: 'row' }} gap="6">
        {/* Current book */}
        <Box flex="2" minW="0">
          <Flex gap="4" align="flex-start">
            {book?.coverUrl && (
              <Image
                src={book.coverUrl}
                alt={book.title}
                w="80px"
                h="120px"
                objectFit="cover"
                borderRadius="lg"
                flexShrink={0}
                shadow="sm"
              />
            )}
            <Box flex="1" minW="0">
              {book && (
                <AppLink to={`/books/${book.id}`} fontWeight="700" fontSize="md" display="block" mb="1">
                  {book.title}
                </AppLink>
              )}
              {book && (
                <Text fontSize="sm" color="gray.500" mb="3">
                  {book.author}
                </Text>
              )}

              {/* Progress */}
              <Box mb="3">
                <Flex justify="space-between" fontSize="xs" color="gray.500" mb="1">
                  <Text>Прогресс чтения</Text>
                  <Text fontWeight="600">{wb.readingProgress}%</Text>
                </Flex>
                <Box bg="gray.100" borderRadius="full" h="8px" overflow="hidden">
                  <Box
                    h="100%"
                    w={`${wb.readingProgress}%`}
                    bg={`${club.coverColor}.400`}
                    borderRadius="full"
                    transition="width 0.3s"
                  />
                </Box>
              </Box>

              {/* Timer */}
              <HStack gap="1.5" fontSize="sm" color="gray.500">
                <ClockIcon size={14} />
                <Text>
                  До конца: <Text as="span" fontWeight="600" color="gray.700">{timeLeft}</Text>
                </Text>
              </HStack>
            </Box>
          </Flex>
        </Box>

        {/* Right column: next book + readers */}
        <Flex flex="1.2" direction="column" gap="4" minW={{ lg: '220px' }}>
          {/* Next book */}
          {nextBook && (
            <Box borderWidth="1px" borderRadius="xl" p="3" bg="gray.50">
              <Text fontSize="2xs" fontWeight="600" color="gray.400" textTransform="uppercase" mb="1.5">
                Следующая книга
              </Text>
              <Flex gap="3" align="center">
                {nextBook.coverUrl && (
                  <Image
                    src={nextBook.coverUrl}
                    alt={nextBook.title}
                    w="40px"
                    h="60px"
                    objectFit="cover"
                    borderRadius="md"
                    flexShrink={0}
                  />
                )}
                <Box flex="1" minW="0">
                  <AppLink
                    to={`/books/${nextBook.id}`}
                    fontWeight="600"
                    fontSize="sm"
                    display="block"
                    lineHeight="short"
                  >
                    {nextBook.title}
                  </AppLink>
                  <Text fontSize="xs" color="gray.400" mt="0.5">
                    {nextBook.author}
                  </Text>
                </Box>
                <ChevronRightIcon size={16} color="var(--chakra-colors-gray-300)" />
              </Flex>
            </Box>
          )}

          {/* Active readers */}
          <Box borderWidth="1px" borderRadius="xl" p="3">
            <Flex align="center" gap="1.5" mb="2">
              <UsersIcon size={14} color="var(--chakra-colors-gray-400)" />
              <Text fontSize="xs" fontWeight="600" color="gray.500">
                Читают сейчас ({readers.length})
              </Text>
            </Flex>
            <Stack gap="1.5">
              {readers.map((m) =>
                m ? (
                  <Flex key={m.userId} align="center" gap="2">
                    <Box
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      bg={`${club.coverColor}.100`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Text fontSize="2xs" fontWeight="700" color={`${club.coverColor}.600`}>
                        {m.username.charAt(0).toUpperCase()}
                      </Text>
                    </Box>
                    <AppLink to={`/users/${m.userId}`} fontSize="sm" fontWeight="500">
                      @{m.username}
                    </AppLink>
                  </Flex>
                ) : null,
              )}
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
