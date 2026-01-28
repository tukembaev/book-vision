import { Stack } from '@chakra-ui/react';

import type { ChallengeProgress } from '../../mocks/challengesDb.mock';
import { ChallengeCard } from '../ChallengeCard/ChallengeCard.tsx';

export interface ChallengesListProps {
  challenges: ChallengeProgress[];
}

export function ChallengesList({ challenges }: ChallengesListProps) {
  return (
    <Stack gap="3">
      {challenges.map((c) => (
        <ChallengeCard key={c.id} challenge={c} />
      ))}
    </Stack>
  );
}
