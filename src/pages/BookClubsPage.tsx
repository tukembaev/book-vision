import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  BookOpenIcon,
  CrownIcon,
  LockIcon,
  StarIcon,
  SwordsIcon,
  UsersIcon,
} from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import {
  getMockBookClubs,
  getWeeklyBooks,
  getActiveDebates,
} from '../features/clubs/mocks/bookClubsDb.mock';
import type { BookClub } from '../features/clubs/mocks/bookClubsDb.mock';

import { WeeklyBooksWidget } from '../features/clubs/ui/WeeklyBooksWidget/WeeklyBooksWidget';

/* ─── Helpers ───────────────────────────────────────────── */

function pluralMembers(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} участник`;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} участника`;
  return `${n} участников`;
}

/* ─── Spotlight Card (top-1) ────────────────────────────── */

function SpotlightCard({ club }: { club: BookClub }) {
  const weeklyBook = club.weeklyBook ? getMockBookById(club.weeklyBook.bookId) : null;
  const owner = club.members.find((m) => m.role === 'owner');

  return (
    <AppLink to={`/clubs/${club.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={`${club.coverColor}.50`}
        _hover={{ shadow: 'lg' }}
        transition="all 0.25s"
        position="relative"
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          {/* Left accent */}
          <Flex
            flex={{ md: '1' }}
            bg={`${club.coverColor}.100`}
            minH={{ base: '140px', md: '260px' }}
            align="center"
            justify="center"
            direction="column"
            gap="3"
            p="6"
          >
            <Box
              w="72px"
              h="72px"
              borderRadius="2xl"
              bg={`${club.coverColor}.200`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="3xl" fontWeight="900" color={`${club.coverColor}.600`}>
                {club.name.charAt(0)}
              </Text>
            </Box>
            <HStack gap="1" fontSize="md" fontWeight="700" color={`${club.coverColor}.600`}>
              <StarIcon size={16} />
              <Text>{club.rating.toFixed(1)}</Text>
            </HStack>
            <Text fontSize="xs" color={`${club.coverColor}.500`}>
              {pluralMembers(club.membersCount)}
            </Text>
          </Flex>

          {/* Right content */}
          <Flex flex={{ md: '2' }} direction="column" justify="center" p={{ base: '5', md: '8' }} gap="3">
            <Flex gap="2" flexWrap="wrap" align="center">
              <Badge colorPalette={club.coverColor} fontSize="xs">Рекомендуем</Badge>
              {club.isPrivate && (
                <Badge colorPalette="red" fontSize="2xs"><LockIcon size={10} /> Закрытый</Badge>
              )}
              {club.tags.map((t) => (
                <Badge key={t} variant="subtle" fontSize="2xs" colorPalette="gray" textTransform="none">{t}</Badge>
              ))}
            </Flex>

            <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="800" lineHeight="short" color="gray.800">
              {club.name}
            </Heading>

            <Text fontSize="sm" color="gray.600" lineHeight="tall">
              {club.philosophy}
            </Text>

            {weeklyBook && (
              <HStack gap="2" fontSize="sm" color="gray.500" mt="1">
                <BookOpenIcon size={14} />
                <Text>Читают: <Text as="span" fontWeight="600" color="gray.700">{weeklyBook.title}</Text></Text>
              </HStack>
            )}

            {owner && (
              <Text fontSize="xs" color="gray.400" mt="1">
                <CrownIcon size={12} style={{ display: 'inline', verticalAlign: '-2px' }} /> Создатель: @{owner.username}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    </AppLink>
  );
}

/* ─── Compact Club Row ──────────────────────────────────── */

function ClubRow({ club, rank }: { club: BookClub; rank: number }) {
  const weeklyBook = club.weeklyBook ? getMockBookById(club.weeklyBook.bookId) : null;

  return (
    <AppLink to={`/clubs/${club.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Flex
        gap="4"
        p="4"
        borderWidth="1px"
        borderRadius="xl"
        bg="white"
        _hover={{ shadow: 'sm', borderColor: `${club.coverColor}.200` }}
        transition="all 0.2s"
        align="center"
      >
        {/* Rank + accent */}
        <Flex align="center" gap="3" flexShrink={0}>
          <Text fontSize="xl" fontWeight="900" color="gray.200" w="24px" textAlign="center">
            {rank}
          </Text>
          <Box w="4px" h="40px" borderRadius="full" bg={`${club.coverColor}.400`} />
        </Flex>

        {/* Info */}
        <Box flex="1" minW="0">
          <Flex align="center" gap="2" mb="0.5">
            <Heading as="h3" fontSize="sm" fontWeight="700" truncate>
              {club.name}
            </Heading>
            {club.isPrivate && <LockIcon size={12} color="var(--chakra-colors-gray-400)" />}
          </Flex>
          <Text fontSize="xs" color="gray.500" lineHeight="short" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {club.description}
          </Text>
          {weeklyBook && (
            <Text fontSize="xs" color="gray.400" mt="1">
              📖 {weeklyBook.title}
            </Text>
          )}
        </Box>

        {/* Stats */}
        <Flex direction="column" align="flex-end" gap="0.5" flexShrink={0}>
          <HStack gap="1" fontSize="xs" color="gray.500">
            <StarIcon size={12} />
            <Text fontWeight="700">{club.rating.toFixed(1)}</Text>
          </HStack>
          <HStack gap="1" fontSize="xs" color="gray.400">
            <UsersIcon size={12} />
            <Text>{club.membersCount}</Text>
          </HStack>
        </Flex>
      </Flex>
    </AppLink>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function BookClubsPage() {
  const allClubs = useMemo(() => getMockBookClubs(), []);
  const weeklyBooks = useMemo(() => getWeeklyBooks(), []);
  const activeDebates = useMemo(() => getActiveDebates(), []);

  const spotlight = allClubs[0];
  const restClubs = allClubs.slice(1);

  return (
    <Box maxW="1200px" mx="auto" px="4" py="6">
      <Stack gap="8">
        {/* Header */}
        <Box>
          <Heading as="h2" fontSize="2xl" fontWeight="800">
            Книжные клубы
          </Heading>
          <Text mt="1" fontSize="sm" color="gray.500">
            Найди свой клуб по интересам, читай вместе и участвуй в обсуждениях
          </Text>
        </Box>

        {/* Spotlight — #1 club, completely different layout */}
        {spotlight && <SpotlightCard club={spotlight} />}

        {/* Active Debates — full-width preview */}
        {activeDebates.length > 0 && (
          <Box>
            <Heading as="h3" fontSize="lg" fontWeight="700" mb="1">
              ⚔️ Горячие дебаты
            </Heading>
            <Text fontSize="sm" color="gray.500" mb="4">
              Открытые споры в клубах — выбери сторону
            </Text>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="3">
              {activeDebates.map((db) => {
                const book = db.bookId ? getMockBookById(db.bookId) : null;
                return (
                  <AppLink key={db.id} to={`/debates/${db.id}`} display="block" _hover={{ textDecoration: 'none' }}>
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
                        <Flex align="center" gap="2" flexWrap="wrap">
                          <SwordsIcon size={14} color="var(--chakra-colors-orange-400)" />
                          <Text fontSize="xs" color="gray.400" fontWeight="500">{db.clubName}</Text>
                        </Flex>
                        <Text fontSize="sm" fontWeight="700" lineHeight="short">{db.title}</Text>
                        {book && <Badge variant="outline" fontSize="2xs" alignSelf="flex-start" textTransform="none">{book.title}</Badge>}

                        {/* Mini sides preview */}
                        <Flex gap="2" mt="auto" pt="2">
                          <Box flex="1" bg="green.50" borderRadius="md" px="2" py="1.5" textAlign="center">
                            <Text fontSize="2xs" fontWeight="600" color="green.600" truncate>{db.side1.label}</Text>
                          </Box>
                          <Text fontSize="xs" color="gray.300" alignSelf="center">vs</Text>
                          <Box flex="1" bg="red.50" borderRadius="md" px="2" py="1.5" textAlign="center">
                            <Text fontSize="2xs" fontWeight="600" color="red.600" truncate>{db.side2.label}</Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </AppLink>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Divider */}
        <Box borderTopWidth="1px" borderColor="gray.200" />

        {/* Two-column: Club list + Widgets */}
        <Flex gap="6" direction={{ base: 'column', lg: 'row' }} align="flex-start">
          {/* Left — Club list */}
          <Box flex="3" minW="0">
            <Heading as="h3" fontSize="md" fontWeight="700" mb="4">
              Все клубы
            </Heading>
            <Stack gap="3">
              {restClubs.map((club, i) => (
                <ClubRow key={club.id} club={club} rank={i + 2} />
              ))}
            </Stack>
          </Box>

          {/* Right — Widgets */}
          <Box flex="1.2" minW="280px" position={{ lg: 'sticky' }} top={{ lg: '80px' }}>
            <Stack gap="4">
              <WeeklyBooksWidget items={weeklyBooks} />

              {/* Quick stats widget */}
              <Box borderWidth="1px" borderRadius="lg" p="4">
                <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
                  📈 Статистика
                </Heading>
                <Stack gap="2">
                  <Flex justify="space-between" fontSize="sm">
                    <Text color="gray.500">Всего клубов</Text>
                    <Text fontWeight="700">{allClubs.length}</Text>
                  </Flex>
                  <Flex justify="space-between" fontSize="sm">
                    <Text color="gray.500">Участников</Text>
                    <Text fontWeight="700">{allClubs.reduce((s, c) => s + c.membersCount, 0)}</Text>
                  </Flex>
                  <Flex justify="space-between" fontSize="sm">
                    <Text color="gray.500">Обсуждений</Text>
                    <Text fontWeight="700">{allClubs.reduce((s, c) => s + c.discussions.length, 0)}</Text>
                  </Flex>
                  <Flex justify="space-between" fontSize="sm">
                    <Text color="gray.500">Дебатов</Text>
                    <Text fontWeight="700">{allClubs.reduce((s, c) => s + c.debates.length, 0)}</Text>
                  </Flex>
                </Stack>
              </Box>

              {/* Tags cloud */}
              <Box borderWidth="1px" borderRadius="lg" p="4">
                <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
                  🏷️ Популярные темы
                </Heading>
                <Flex gap="2" flexWrap="wrap">
                  {Array.from(new Set(allClubs.flatMap((c) => c.tags))).map((tag) => (
                    <Badge key={tag} variant="subtle" colorPalette="gray" fontSize="xs" textTransform="none">
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
