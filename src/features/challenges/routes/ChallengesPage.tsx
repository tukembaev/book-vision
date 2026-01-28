import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import {
  getMockChallengesByStatus,
  type ChallengeStatus,
} from '../mocks/challengesDb.mock';

import { ChallengesTabs } from '../ui/ChallengesTabs/ChallengesTabs.tsx';
import { ChallengesList } from '../ui/ChallengesList/ChallengesList.tsx';

export default function ChallengesPage() {
  const [tab, setTab] = useState<ChallengeStatus>('active');

  const challenges = useMemo(() => getMockChallengesByStatus(tab), [tab]);

  return (
    <Stack gap="4">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Челленджи
        </Heading>
        <Text mt="2" opacity={0.8}>
          Навигационно простой раздел: активные, выполненные и прогресс (mock).
        </Text>
      </Box>

      <ChallengesTabs value={tab} onChange={setTab} />

      <ChallengesList challenges={challenges} />
    </Stack>
  );
}
