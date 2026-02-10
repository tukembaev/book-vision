import { Box, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { BookOpen, Heart, MessageSquare, Star, TrendingUp } from 'lucide-react';

import type { User } from '@/types/core';
import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';
import { getCommunityHelpStats } from '../../mocks/userProfileDb.mock';

export interface ProfileStatsCenterProps {
  user: User;
  profile: UserProfileDashboard;
}

interface StatSummary {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

interface StatRow {
  label: string;
  value: string;
  percent: number;
}

const mockGenreStats: StatRow[] = [
  { label: 'Классика', value: '5', percent: 100 },
  { label: 'Фантастика', value: '3', percent: 60 },
  { label: 'Детектив', value: '2', percent: 40 },
  { label: 'Нон-фикшн', value: '1', percent: 20 },
  { label: 'Поэзия', value: '1', percent: 20 },
];

const mockMonthlyReading: StatRow[] = [
  { label: 'Январь 2026', value: '4', percent: 100 },
  { label: 'Декабрь 2025', value: '3', percent: 75 },
  { label: 'Ноябрь 2025', value: '2', percent: 50 },
  { label: 'Октябрь 2025', value: '2', percent: 50 },
  { label: 'Сентябрь 2025', value: '1', percent: 25 },
];

function StatCard({
  title,
  icon: Icon,
  color,
  stats,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number | string }>;
  color: string;
  stats: StatSummary[];
}) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box h="4px" bg={color} />
      <Box p="4">
        <Flex align="center" gap="2" mb="3">
          <Icon size={18} />
          <Heading as="h3" size="sm" fontWeight="700">
            {title}
          </Heading>
        </Flex>
        <Grid templateColumns={`repeat(${stats.length}, 1fr)`} gap="4">
          {stats.map((s) => (
            <Box key={s.label}>
              <Text fontSize="xs" opacity={0.7}>
                {s.label}
              </Text>
              <Text fontSize="xl" fontWeight="700" mt="1">
                {s.value}
              </Text>
              {s.change && (
                <Text fontSize="xs" color={s.positive ? 'green.500' : 'red.400'} mt="0.5">
                  {s.change}
                </Text>
              )}
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function StatTable({ title, columnLabel, rows }: { title: string; columnLabel: string; rows: StatRow[] }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h3" size="sm" fontWeight="700" mb="3">
        {title}
      </Heading>
      <Flex justify="space-between" mb="2" px="1">
        <Text fontSize="xs" opacity={0.6}>
          {title}
        </Text>
        <Text fontSize="xs" opacity={0.6}>
          {columnLabel}
        </Text>
      </Flex>
      <Stack gap="2">
        {rows.map((row) => (
          <Flex key={row.label} align="center" gap="3">
            <Box flex="1" position="relative">
              <Box
                bg="teal.100"
                borderRadius="sm"
                h="28px"
                w={`${Math.max(row.percent, 8)}%`}
                display="flex"
                alignItems="center"
                px="2"
              >
                <Text fontSize="sm" fontWeight="500" truncate>
                  {row.label}
                </Text>
              </Box>
            </Box>
            <Text fontSize="sm" fontWeight="600" minW="40px" textAlign="right">
              {row.value}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}

export function ProfileStatsCenter({ user, profile }: ProfileStatsCenterProps) {
  const communityStats = getCommunityHelpStats(profile);

  const completedCount = profile.library.filter((x) => x.status === 'completed').length;
  const readingNowCount = profile.library.filter((x) => x.status === 'reading_now').length;
  const totalLibrary = profile.library.length;

  const readingSummary: StatSummary[] = [
    { label: 'Прочитано', value: String(user.stats.booksRead) },
    { label: 'Читаю сейчас', value: String(readingNowCount) },
    { label: 'В библиотеке', value: String(totalLibrary), change: `+${completedCount} завершено`, positive: true },
  ];

  const communitySummary: StatSummary[] = [
    { label: 'Отзывов', value: String(user.stats.reviewsCount) },
    { label: 'Лайков получено', value: String(user.stats.likesReceived), change: '+12 за месяц', positive: true },
    { label: 'AI-верификаций', value: String(communityStats.aiVerified) },
  ];

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Статистика
        </Heading>
        <Text mt="1" opacity={0.7} fontSize="sm">
          Уровень {profile.level ?? '—'} · {profile.rank ?? 'Без ранга'}
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4">
        <StatCard title="Чтение" icon={BookOpen} color="blue.500" stats={readingSummary} />
        <StatCard title="Вклад в сообщество" icon={Star} color="teal.500" stats={communitySummary} />
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4">
        <StatTable title="Топ жанры" columnLabel="Книг" rows={mockGenreStats} />
        <StatTable title="Чтение по месяцам" columnLabel="Книг" rows={mockMonthlyReading} />
      </Grid>

      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Heading as="h3" size="sm" fontWeight="700" mb="3">
          Общая сводка
        </Heading>
        <Grid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }} gap="4">
          {[
            { icon: BookOpen, label: 'Страниц прочитано', value: '3 240' },
            { icon: MessageSquare, label: 'Комментариев', value: String(profile.activity.filter((a) => a.type === 'comment').length) },
            { icon: Heart, label: 'Лайков отдано', value: '27' },
            { icon: TrendingUp, label: 'Дней подряд', value: '14' },
          ].map((item) => (
            <Flex key={item.label} align="center" gap="3" p="3" borderWidth="1px" borderRadius="md">
              <Box opacity={0.6}>
                <item.icon size={20} />
              </Box>
              <Box>
                <Text fontSize="xs" opacity={0.7}>
                  {item.label}
                </Text>
                <Text fontSize="lg" fontWeight="700">
                  {item.value}
                </Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
