import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { getMockChallengesByStatus, type ChallengeStatus } from '@/features/challenges/mocks/challengesDb.mock';
import { ChallengesList } from '@/features/challenges/ui/ChallengesList/ChallengesList.tsx';

export interface ProfileChallengesCenterProps {
  initialTab?: ChallengeStatus;
}

export function ProfileChallengesCenter({ initialTab = 'active' }: ProfileChallengesCenterProps) {
  const [tab, setTab] = useState<ChallengeStatus>(initialTab);

  const items = useMemo(() => getMockChallengesByStatus(tab), [tab]);

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Челленджи
        </Heading>
        <Text mt="2" opacity={0.8}>
          Активные и завершённые, прогресс (mock).
        </Text>
      </Box>

      <Flex gap="2" wrap="wrap">
        <Button size="sm" variant={tab === 'active' ? 'solid' : 'outline'} onClick={() => setTab('active')}>
          активные
        </Button>
        <Button
          size="sm"
          variant={tab === 'completed' ? 'solid' : 'outline'}
          onClick={() => setTab('completed')}
        >
          выполненные
        </Button>
      </Flex>

      <ChallengesList challenges={items} />
    </Stack>
  );
}
