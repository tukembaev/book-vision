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
  ChevronUpIcon,
  BookOpenIcon,
  SwordsIcon,
  UsersIcon,
} from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { getMockDebateDetail } from '../features/clubs/mocks/bookClubsDb.mock';
import type { DebateArgument } from '../features/clubs/mocks/bookClubsDb.mock';

/* ─── Argument Card ─────────────────────────────────────── */

function ArgumentCard({ arg, accentColor }: { arg: DebateArgument; accentColor: string }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" bg="white">
      <Flex gap="3" align="flex-start">
        {/* Vote column */}
        <Flex
          direction="column"
          align="center"
          gap="0"
          flexShrink={0}
          minW="36px"
        >
          <Box color={`${accentColor}.400`} cursor="pointer" _hover={{ color: `${accentColor}.600` }}>
            <ChevronUpIcon size={20} />
          </Box>
          <Text fontSize="md" fontWeight="800" color={`${accentColor}.500`}>
            {arg.votes}
          </Text>
        </Flex>

        {/* Content */}
        <Box flex="1" minW="0">
          <Text fontSize="sm" lineHeight="tall" color="gray.700">
            {arg.text}
          </Text>
          <HStack gap="2" mt="2" fontSize="xs" color="gray.400">
            <AppLink to={`/users/${arg.userId}`} fontWeight="600" color="gray.500" _hover={{ color: 'gray.700' }}>
              @{arg.username}
            </AppLink>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function DebateDetailPage() {
  const { debateId } = useParams<{ debateId: string }>();
  const debate = useMemo(() => (debateId ? getMockDebateDetail(debateId) : undefined), [debateId]);

  if (!debate) {
    return (
      <Box maxW="1200px" mx="auto" px="4" py="10" textAlign="center">
        <Heading fontSize="xl">Дебаты не найдены</Heading>
        <Text mt="2" color="gray.500">Возможно, они были удалены или ссылка неверна.</Text>
        <AppLink to="/clubs" mt="4" display="inline-block" fontWeight="600">
          ← К списку клубов
        </AppLink>
      </Box>
    );
  }

  const book = debate.bookId ? getMockBookById(debate.bookId) : null;
  const side1Sorted = [...debate.side1.arguments].sort((a, b) => b.votes - a.votes);
  const side2Sorted = [...debate.side2.arguments].sort((a, b) => b.votes - a.votes);
  const totalSide1 = side1Sorted.reduce((s, a) => s + a.votes, 0);
  const totalSide2 = side2Sorted.reduce((s, a) => s + a.votes, 0);
  const totalVotes = totalSide1 + totalSide2;
  const pct1 = totalVotes > 0 ? Math.round((totalSide1 / totalVotes) * 100) : 50;
  const pct2 = 100 - pct1;

  return (
    <Box maxW="1300px" mx="auto" px="4" py="6">
      <Stack gap="6">
        {/* Breadcrumb */}
        <HStack gap="2" fontSize="sm" color="gray.400">
          <AppLink to="/clubs" _hover={{ color: 'gray.600' }}>Клубы</AppLink>
          <Text>›</Text>
          <AppLink to={`/clubs/${debate.clubId}`} _hover={{ color: 'gray.600' }}>{debate.clubName}</AppLink>
          <Text>›</Text>
          <Text color="gray.600">Дебаты</Text>
        </HStack>

        {/* ── Center: Title + Book + Stats ──────────── */}
        <Box textAlign="center">
          <Flex justify="center" gap="2" mb="3" flexWrap="wrap">
            <Badge
              colorPalette={debate.status === 'active' ? 'green' : 'gray'}
              fontSize="xs"
              px="3"
              py="1"
            >
              <SwordsIcon size={12} />
              {debate.status === 'active' ? ' Открытые дебаты' : ' Завершённые дебаты'}
            </Badge>
            {book && (
              <Badge variant="outline" fontSize="xs" px="3" py="1">
                <BookOpenIcon size={12} />
                {' '}{book.title}
              </Badge>
            )}
          </Flex>

          <Heading as="h1" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="800" lineHeight="shorter" maxW="700px" mx="auto">
            {debate.title}
          </Heading>

          {/* Stats bar */}
          <Box maxW="500px" mx="auto" mt="5">
            <Flex justify="space-between" fontSize="sm" mb="1.5">
              <Text fontWeight="700" color="green.600">{debate.side1.label}</Text>
              <Text fontWeight="700" color="red.600">{debate.side2.label}</Text>
            </Flex>

            {/* Progress bar */}
            <Flex h="10px" borderRadius="full" overflow="hidden" bg="gray.100">
              <Box w={`${pct1}%`} bg="green.400" transition="width 0.3s" />
              <Box w={`${pct2}%`} bg="red.400" transition="width 0.3s" />
            </Flex>

            <Flex justify="space-between" fontSize="xs" color="gray.500" mt="1">
              <Text>{pct1}% · {side1Sorted.length} аргументов · {totalSide1} голосов</Text>
              <Text>{pct2}% · {side2Sorted.length} аргументов · {totalSide2} голосов</Text>
            </Flex>
          </Box>

          <HStack justify="center" gap="4" mt="3" fontSize="xs" color="gray.400">
            <HStack gap="1">
              <UsersIcon size={13} />
              <Text>{new Set([...side1Sorted.map(a => a.userId), ...side2Sorted.map(a => a.userId)]).size} участников</Text>
            </HStack>
          </HStack>
        </Box>

        {/* ── Three-column: Side1 | Divider | Side2 ─── */}
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 2px 1fr' }}
          gap={{ base: '6', lg: '8' }}
          alignItems="start"
        >
          {/* Left — Side 1 (FOR) */}
          <Box>
            <Box
              bg="green.50"
              borderRadius="xl"
              p="4"
              mb="4"
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="800" color="green.600">
                {debate.side1.label}
              </Text>
              <Text fontSize="xs" color="green.500" mt="1">
                {side1Sorted.length} аргументов · {totalSide1} голосов
              </Text>
            </Box>

            <Stack gap="3">
              {side1Sorted.map((arg) => (
                <ArgumentCard key={arg.id} arg={arg} accentColor="green" />
              ))}
            </Stack>
          </Box>

          {/* Center divider (desktop only) */}
          <Box display={{ base: 'none', lg: 'block' }} bg="gray.200" minH="200px" />

          {/* Right — Side 2 (AGAINST) */}
          <Box>
            <Box
              bg="red.50"
              borderRadius="xl"
              p="4"
              mb="4"
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="800" color="red.600">
                {debate.side2.label}
              </Text>
              <Text fontSize="xs" color="red.500" mt="1">
                {side2Sorted.length} аргументов · {totalSide2} голосов
              </Text>
            </Box>

            <Stack gap="3">
              {side2Sorted.map((arg) => (
                <ArgumentCard key={arg.id} arg={arg} accentColor="red" />
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* ── Summary (if debate finished) ─────────── */}
        {debate.status === 'finished' && debate.summary && (
          <Box
            borderWidth="1px"
            borderRadius="xl"
            p="6"
            bg="gray.50"
            maxW="800px"
            mx="auto"
          >
            <Heading as="h3" fontSize="md" fontWeight="700" mb="3">
              📋 Итоги дебатов
            </Heading>
            <Text fontSize="sm" color="gray.600" lineHeight="tall">
              {debate.summary}
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
