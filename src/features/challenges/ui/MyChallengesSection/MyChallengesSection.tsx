import { Grid, Heading, Stack } from '@chakra-ui/react';

import type { MyChallengeData } from '../../types/challenge.types';
import { MyChallengeCard } from '../MyChallengeCard/MyChallengeCard';

export interface MyChallengesSectionProps {
  challenges: MyChallengeData[];
}

export function MyChallengesSection({ challenges }: MyChallengesSectionProps) {
  if (challenges.length === 0) return null;

  return (
    <Stack gap="4">
      <Heading as="h3" fontSize="lg" fontWeight="700">
        Мои челленджи
      </Heading>
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap="4"
      >
        {challenges.map((ch) => (
          <MyChallengeCard key={ch.id} challenge={ch} />
        ))}
      </Grid>
    </Stack>
  );
}
