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
import { useParams } from 'react-router-dom';
import {
  CrownIcon,
  MessageSquareIcon,
  ShieldIcon,
  SwordsIcon,
  UserIcon,
  VoteIcon,
} from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { getMockBookClubById } from '../features/clubs/mocks/bookClubsDb.mock';
import { FeaturedClubHero } from '../features/clubs/ui/FeaturedClubHero/FeaturedClubHero';
import { BookOfTheWeek } from '../features/clubs/ui/BookOfTheWeek/BookOfTheWeek';

/* ─── Helpers ───────────────────────────────────────────── */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'только что';
  if (hours < 24) return `${hours}ч назад`;
  const days = Math.floor(hours / 24);
  return `${days}д назад`;
}

function roleLabel(role: 'owner' | 'moderator' | 'member') {
  if (role === 'owner') return 'Создатель';
  if (role === 'moderator') return 'Модератор';
  return 'Участник';
}

function roleColor(role: 'owner' | 'moderator' | 'member') {
  if (role === 'owner') return 'orange';
  if (role === 'moderator') return 'purple';
  return 'gray';
}

/* ─── Page ──────────────────────────────────────────────── */

export default function BookClubPage() {
  const { clubId } = useParams<{ clubId: string }>();
  const club = useMemo(() => (clubId ? getMockBookClubById(clubId) : undefined), [clubId]);

  if (!club) {
    return (
      <Box maxW="1200px" mx="auto" px="4" py="10" textAlign="center">
        <Heading fontSize="xl">Клуб не найден</Heading>
        <Text mt="2" color="gray.500">Возможно, он был удалён или ссылка неверна.</Text>
        <AppLink to="/clubs" mt="4" display="inline-block" fontWeight="600">
          ← К списку клубов
        </AppLink>
      </Box>
    );
  }

  const sortedMembers = [...club.members].sort((a, b) => b.rating - a.rating);

  return (
    <Box maxW="1200px" mx="auto" px="4" py="6">
      <Stack gap="8">
        {/* ── Hero Header ──────────────────────────── */}
        <Box>
          <AppLink to="/clubs" fontSize="sm" color="gray.400" _hover={{ color: 'gray.600' }} mb="3" display="inline-block">
            ← Все клубы
          </AppLink>

          <FeaturedClubHero club={club} />
        </Box>

        {/* ── Book of the Week ───────────────────────── */}
        <BookOfTheWeek club={club} />

        {/* ── Two-column body ──────────────────────── */}
        <Flex gap="6" direction={{ base: 'column', lg: 'row' }} align="flex-start">
          {/* ── Left: Main content ─────────────────── */}
          <Box flex="3" minW="0">
            <Stack gap="8">

              {/* Discussions */}
              <Box>
                <Heading as="h2" fontSize="lg" fontWeight="700" mb="3">
                  <HStack gap="2">
                    <MessageSquareIcon size={18} />
                    <Text>Обсуждения</Text>
                  </HStack>
                </Heading>

                {club.discussions.length === 0 ? (
                  <Text fontSize="sm" color="gray.400">Пока нет обсуждений.</Text>
                ) : (
                  <Stack gap="2">
                    {club.discussions.map((d) => {
                      const book = d.bookId ? getMockBookById(d.bookId) : null;
                      return (
                        <Box key={d.id} borderWidth="1px" borderRadius="lg" p="4" _hover={{ bg: 'gray.50' }} transition="background 0.15s">
                          <Flex align="center" gap="2" mb="1" flexWrap="wrap">
                            {d.pinned && <Badge colorPalette="orange" fontSize="2xs">Закреплено</Badge>}
                            {book && <Badge variant="outline" fontSize="2xs" textTransform="none">{book.title}</Badge>}
                          </Flex>
                          <Text fontSize="sm" fontWeight="700">{d.title}</Text>
                          <HStack gap="3" fontSize="xs" color="gray.400" mt="1.5">
                            <HStack gap="0.5">
                              <MessageSquareIcon size={12} />
                              <Text>{d.messagesCount} сообщений</Text>
                            </HStack>
                            <Text>{timeAgo(d.lastActivityAt)}</Text>
                          </HStack>
                        </Box>
                      );
                    })}
                  </Stack>
                )}
              </Box>

              {/* Polls */}
              <Box>
                <Heading as="h2" fontSize="lg" fontWeight="700" mb="3">
                  <HStack gap="2">
                    <VoteIcon size={18} />
                    <Text>Опросы</Text>
                  </HStack>
                </Heading>

                {club.polls.length === 0 ? (
                  <Text fontSize="sm" color="gray.400">Нет активных опросов.</Text>
                ) : (
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="3">
                    {club.polls.map((poll) => {
                      const total = poll.options.reduce((s, o) => s + o.votes, 0);
                      return (
                        <Box key={poll.id} borderWidth="1px" borderRadius="lg" p="4">
                          <Text fontSize="sm" fontWeight="700" mb="2">{poll.question}</Text>
                          <Stack gap="1.5">
                            {poll.options.map((opt) => {
                              const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                              return (
                                <Box key={opt.label}>
                                  <Flex justify="space-between" fontSize="xs" mb="0.5">
                                    <Text>{opt.label}</Text>
                                    <Text color="gray.400">{pct}%</Text>
                                  </Flex>
                                  <Box bg="gray.100" borderRadius="full" h="6px" overflow="hidden">
                                    <Box h="100%" w={`${pct}%`} bg={`${club.coverColor}.400`} borderRadius="full" transition="width 0.3s" />
                                  </Box>
                                </Box>
                              );
                            })}
                          </Stack>
                          <Text fontSize="2xs" color="gray.400" mt="2">{total} голосов</Text>
                        </Box>
                      );
                    })}
                  </Grid>
                )}
              </Box>

              {/* Debates */}
              <Box>
                <Heading as="h2" fontSize="lg" fontWeight="700" mb="3">
                  <HStack gap="2">
                    <SwordsIcon size={18} />
                    <Text>Дебаты</Text>
                  </HStack>
                </Heading>

                {club.debates.length === 0 ? (
                  <Text fontSize="sm" color="gray.400">Нет активных дебатов.</Text>
                ) : (
                  <Stack gap="3">
                    {club.debates.map((db) => {
                      const book = db.bookId ? getMockBookById(db.bookId) : null;
                      return (
                        <AppLink key={db.id} to={`/debates/${db.id}`} display="block" _hover={{ textDecoration: 'none' }}>
                          <Box borderWidth="1px" borderRadius="lg" p="4" _hover={{ shadow: 'sm' }} transition="all 0.2s">
                            <Flex align="center" gap="2" mb="2" flexWrap="wrap">
                              <Badge colorPalette={db.status === 'active' ? 'green' : 'gray'} fontSize="2xs">
                                {db.status === 'active' ? 'Активный' : 'Завершён'}
                              </Badge>
                              {book && <Badge variant="outline" fontSize="2xs" textTransform="none">{book.title}</Badge>}
                            </Flex>
                            <Text fontSize="sm" fontWeight="700" mb="3">{db.title}</Text>
                            <Grid templateColumns="1fr 1fr" gap="3">
                              <Box bg="green.50" borderRadius="lg" p="3" textAlign="center">
                                <Text fontSize="xs" fontWeight="600" color="green.700">{db.side1.label}</Text>
                                <Text fontSize="2xl" fontWeight="800" color="green.500">{db.side1.supporters.length}</Text>
                                <Text fontSize="2xs" color="green.600">сторонников</Text>
                              </Box>
                              <Box bg="red.50" borderRadius="lg" p="3" textAlign="center">
                                <Text fontSize="xs" fontWeight="600" color="red.700">{db.side2.label}</Text>
                                <Text fontSize="2xl" fontWeight="800" color="red.500">{db.side2.supporters.length}</Text>
                                <Text fontSize="2xs" color="red.600">сторонников</Text>
                              </Box>
                            </Grid>
                          </Box>
                        </AppLink>
                      );
                    })}
                  </Stack>
                )}
              </Box>
            </Stack>
          </Box>

          {/* ── Right: Sidebar ─────────────────────── */}
          <Box flex="1.2" minW="280px" position={{ lg: 'sticky' }} top={{ lg: '80px' }}>
            <Stack gap="4">

              {/* Philosophy */}
              <Box borderWidth="1px" borderRadius="lg" p="4">
                <Heading as="h4" fontSize="sm" fontWeight="700" mb="2">
                  💡 Философия клуба
                </Heading>
                <Text fontSize="sm" color="gray.600" fontStyle="italic" lineHeight="tall">
                  «{club.philosophy}»
                </Text>
              </Box>

              {/* Rules */}
              <Box borderWidth="1px" borderRadius="lg" p="4">
                <Heading as="h4" fontSize="sm" fontWeight="700" mb="2">
                  📜 Правила
                </Heading>
                <Stack gap="1.5">
                  {club.rules.map((rule, i) => (
                    <Flex key={i} gap="2" fontSize="sm" color="gray.600">
                      <Text color="gray.300" fontWeight="700" flexShrink={0}>{i + 1}.</Text>
                      <Text>{rule}</Text>
                    </Flex>
                  ))}
                </Stack>
              </Box>

              {/* Members / Leaderboard */}
              <Box borderWidth="1px" borderRadius="lg" p="4">
                <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
                  👥 Участники · Рейтинг
                </Heading>
                <Stack gap="2">
                  {sortedMembers.map((m, i) => (
                    <Flex key={m.userId} align="center" gap="2.5">
                      <Text fontSize="sm" fontWeight="800" color="gray.200" w="18px" textAlign="center" flexShrink={0}>
                        {i + 1}
                      </Text>
                      <Box
                        w="28px"
                        h="28px"
                        borderRadius="full"
                        bg={`${roleColor(m.role)}.100`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        {m.role === 'owner' ? (
                          <CrownIcon size={13} color={`var(--chakra-colors-${roleColor(m.role)}-500)`} />
                        ) : m.role === 'moderator' ? (
                          <ShieldIcon size={13} color={`var(--chakra-colors-${roleColor(m.role)}-500)`} />
                        ) : (
                          <UserIcon size={13} color="var(--chakra-colors-gray-400)" />
                        )}
                      </Box>
                      <Box flex="1" minW="0">
                        <AppLink to={`/users/${m.userId}`} fontSize="sm" fontWeight="600" truncate display="block">
                          @{m.username}
                        </AppLink>
                        <Text fontSize="2xs" color="gray.400">
                          {roleLabel(m.role)} · {m.booksDiscussed} книг
                        </Text>
                      </Box>
                      <Text fontSize="sm" fontWeight="700" color={`${roleColor(m.role)}.500`}>
                        {m.rating}
                      </Text>
                    </Flex>
                  ))}
                </Stack>
                {club.membersCount > club.members.length && (
                  <Text fontSize="xs" color="gray.400" mt="3" textAlign="center">
                    и ещё {club.membersCount - club.members.length} участников
                  </Text>
                )}
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
