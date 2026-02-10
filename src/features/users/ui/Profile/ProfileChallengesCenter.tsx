import { Box, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { Trophy, Target, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

import { mockMyChallenges } from '@/features/challenges/mocks/challengesMock';
import { getMockChallengesByStatus, type ChallengeStatus } from '@/features/challenges/mocks/challengesDb.mock';
import { MyChallengeCard } from '@/features/challenges/ui/MyChallengeCard/MyChallengeCard';
import { ChallengesTabs } from '@/features/challenges/ui/ChallengesTabs/ChallengesTabs';
import { ChallengeCard } from '@/features/challenges/ui/ChallengeCard/ChallengeCard';

export interface ProfileChallengesCenterProps {
  initialTab?: ChallengeStatus;
}

export function ProfileChallengesCenter({ initialTab = 'active' }: ProfileChallengesCenterProps) {
  const [tab, setTab] = useState<ChallengeStatus>(initialTab);

  const filteredChallenges = getMockChallengesByStatus(tab);
  const activeCount = getMockChallengesByStatus('active').length;
  const completedCount = getMockChallengesByStatus('completed').length;

  return (
    <Stack gap="6">
      {/* Header */}
      <Box>
        <Flex align="center" gap="2" mb="1">
          <Trophy size={20} />
          <Heading as="h2" size="md" fontWeight="700">
            Челленджи
          </Heading>
        </Flex>
        <Text fontSize="sm" opacity={0.6}>
          Принятые вызовы и прогресс
        </Text>
      </Box>

      {/* Stats summary */}
      <Grid templateColumns="repeat(3, 1fr)" gap="3">
        <Box borderWidth="1px" borderRadius="lg" p="3" textAlign="center">
          <Flex justify="center" mb="1" opacity={0.6}><Target size={16} /></Flex>
          <Text fontSize="lg" fontWeight="700">{activeCount + completedCount}</Text>
          <Text fontSize="xs" opacity={0.6}>Всего</Text>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" p="3" textAlign="center">
          <Flex justify="center" mb="1" opacity={0.6}><Trophy size={16} /></Flex>
          <Text fontSize="lg" fontWeight="700">{activeCount}</Text>
          <Text fontSize="xs" opacity={0.6}>Активные</Text>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" p="3" textAlign="center">
          <Flex justify="center" mb="1" opacity={0.6}><CheckCircle2 size={16} /></Flex>
          <Text fontSize="lg" fontWeight="700">{completedCount}</Text>
          <Text fontSize="xs" opacity={0.6}>Завершены</Text>
        </Box>
      </Grid>

      {/* My challenges (from challenges page) */}
      {mockMyChallenges.length > 0 && (
        <Box>
          <Heading as="h3" fontSize="sm" fontWeight="600" mb="3" opacity={0.7} textTransform="uppercase" letterSpacing="wide">
            Мои челленджи
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="3">
            {mockMyChallenges.map((ch) => (
              <MyChallengeCard key={ch.id} challenge={ch} />
            ))}
          </Grid>
        </Box>
      )}

      {/* Filtered list */}
      <Box>
        <Heading as="h3" fontSize="sm" fontWeight="600" mb="3" opacity={0.7} textTransform="uppercase" letterSpacing="wide">
          Все челленджи
        </Heading>
        <ChallengesTabs value={tab} onChange={setTab} />
        <Stack gap="3" mt="3">
          {filteredChallenges.length === 0 ? (
            <Text opacity={0.6} fontSize="sm">Нет челленджей в этой категории.</Text>
          ) : (
            filteredChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
