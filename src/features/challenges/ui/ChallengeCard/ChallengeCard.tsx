import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { ChallengeProgress } from '../../mocks/challengesDb.mock';

export interface ChallengeCardProps {
  challenge: ChallengeProgress;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Heading as="h3" size="sm" fontWeight="600">
          {challenge.title}
        </Heading>

        <Text opacity={0.85}>{challenge.description}</Text>

        <Text fontSize="sm" opacity={0.7}>
          Прогресс: {challenge.progressCount}/{challenge.targetCount} · Награда: {challenge.rewardPoints}
        </Text>
      </Stack>
    </Box>
  );
}
