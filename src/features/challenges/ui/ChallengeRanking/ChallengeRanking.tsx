import { Box, Heading, Stack } from '@chakra-ui/react';

import type { ChallengeParticipant } from '../../types/challenge.types';
import { RankingUserRow } from '../RankingUserRow/RankingUserRow';

export interface ChallengeRankingProps {
  participants: ChallengeParticipant[];
}

function sortParticipants(participants: ChallengeParticipant[]): ChallengeParticipant[] {
  return [...participants].sort((a, b) => {
    if (b.booksRead !== a.booksRead) return b.booksRead - a.booksRead;
    return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
  });
}

export function ChallengeRanking({ participants }: ChallengeRankingProps) {
  const sorted = sortParticipants(participants);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        🏆 Рейтинг участников
      </Heading>

      <Stack gap="0">
        {sorted.map((p, i) => (
          <RankingUserRow key={p.id} participant={p} rank={i + 1} />
        ))}
      </Stack>
    </Box>
  );
}
