import { Grid, Heading, Stack } from '@chakra-ui/react';

import type { ChallengeCardData } from '../../types/challenge.types';
import { CommunityChallengeCard } from '../CommunityChallengeCard/CommunityChallengeCard';

export interface CommunityChallengesSectionProps {
  challenges: ChallengeCardData[];
}

export function CommunityChallengesSection({ challenges }: CommunityChallengesSectionProps) {
  if (challenges.length === 0) return null;

  return (
    <Stack gap="4">
      <Heading as="h3" fontSize="lg" fontWeight="700">
        Лучшие челленджи сообщества
      </Heading>
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap="4"
      >
        {challenges.map((ch) => (
          <CommunityChallengeCard key={ch.id} challenge={ch} />
        ))}
      </Grid>
    </Stack>
  );
}
