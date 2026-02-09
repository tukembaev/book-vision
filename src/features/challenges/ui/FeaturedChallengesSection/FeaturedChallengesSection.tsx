import { Grid, Heading, Stack } from '@chakra-ui/react';

import type { ChallengeCardData } from '../../types/challenge.types';
import { FeaturedChallengeCard } from '../FeaturedChallengeCard/FeaturedChallengeCard';

export interface FeaturedChallengesSectionProps {
  challenges: ChallengeCardData[];
}

export function FeaturedChallengesSection({ challenges }: FeaturedChallengesSectionProps) {
  if (challenges.length === 0) return null;

  return (
    <Stack gap="4">
      <Heading as="h3" fontSize="lg" fontWeight="700">
        Челленджи от BookVision
      </Heading>
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap="4"
      >
        {challenges.map((ch) => (
          <FeaturedChallengeCard key={ch.id} challenge={ch} />
        ))}
      </Grid>
    </Stack>
  );
}
