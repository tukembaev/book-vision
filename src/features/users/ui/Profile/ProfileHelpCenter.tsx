import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Heart } from 'lucide-react';

import type { UserProfileDashboard, UserActivityType } from '../../mocks/userProfileDb.mock';
import { getCommunityHelpStats } from '../../mocks/userProfileDb.mock';
import { WordExplanationCard } from './CommunityHelp/WordExplanationCard';
import { QuoteContributionCard } from './CommunityHelp/QuoteContributionCard';
import { ContextFactCard } from './CommunityHelp/ContextFactCard';

export interface ProfileHelpCenterProps {
  profile: UserProfileDashboard;
}

const blocks: { type: UserActivityType; title: string }[] = [
  { type: 'word', title: 'Пояснения слов' },
  { type: 'quote', title: 'Цитаты' },
  { type: 'context', title: 'Контекст / факты' },
];

export function ProfileHelpCenter({ profile }: ProfileHelpCenterProps) {
  const stats = getCommunityHelpStats(profile);

  return (
    <Stack gap="6">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Помощь сообществу
        </Heading>
        <Text mt="1" fontSize="sm" opacity={0.6}>
          Портфолио вкладов: verified статусы, лайки и быстрые ссылки.
        </Text>
      </Box>

      {/* Summary stats */}
      <Flex gap="4" wrap="wrap">
        <Flex align="center" gap="2" borderWidth="1px" borderRadius="lg" px="4" py="2.5">
          <Heart size={14} style={{ opacity: 0.5 }} />
          <Text fontSize="sm"><Text as="span" fontWeight="700">{stats.totalLikes}</Text> лайков</Text>
        </Flex>
        <Flex align="center" gap="2" borderWidth="1px" borderRadius="lg" px="4" py="2.5">
          <Text fontSize="sm"><Text as="span" fontWeight="700">{stats.aiVerified}</Text> AI-верификаций</Text>
        </Flex>
        <Flex align="center" gap="2" borderWidth="1px" borderRadius="lg" px="4" py="2.5">
          <Text fontSize="sm"><Text as="span" fontWeight="700">{stats.communityVerified}</Text> от сообщества</Text>
        </Flex>
      </Flex>

      {blocks.map((b) => {
        const items = profile.contributions.filter((c) => c.type === b.type);

        return (
          <Box key={b.type}>
            <Heading as="h3" fontSize="sm" fontWeight="600" mb="3" opacity={0.7} textTransform="uppercase" letterSpacing="wide">
              {b.title}
            </Heading>

            {items.length === 0 ? (
              <Text fontSize="sm" opacity={0.5}>
                Пока нет вкладов.
              </Text>
            ) : (
              <Stack gap="3">
                {items.map((item) => {
                  if (b.type === 'word') return <WordExplanationCard key={item.id} item={item} />;
                  if (b.type === 'quote') return <QuoteContributionCard key={item.id} item={item} />;
                  if (b.type === 'context') return <ContextFactCard key={item.id} item={item} />;
                  return null;
                })}
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
