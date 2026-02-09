import { Box, Flex, Text } from '@chakra-ui/react';
import { User } from 'lucide-react';

import type { ChallengeParticipant } from '../../types/challenge.types';

export interface RankingUserRowProps {
  participant: ChallengeParticipant;
  rank: number;
}

export function RankingUserRow({ participant, rank }: RankingUserRowProps) {
  const isTopThree = rank <= 3;

  const rankColors: Record<number, string> = {
    1: 'yellow.500',
    2: 'gray.400',
    3: 'orange.400',
  };

  return (
    <Flex align="center" gap="3" py="2.5" px="3" _hover={{ bg: 'gray.50' }} borderRadius="md">
      {/* Rank number */}
      <Text
        fontSize="sm"
        fontWeight={isTopThree ? '800' : '600'}
        color={rankColors[rank] || 'gray.500'}
        w="20px"
        textAlign="center"
        flexShrink={0}
      >
        {rank}
      </Text>

      {/* Avatar */}
      <Flex
        w="32px"
        h="32px"
        borderRadius="full"
        align="center"
        justify="center"
        bg={isTopThree ? 'blue.50' : 'gray.100'}
        flexShrink={0}
      >
        {participant.avatarUrl ? (
          <img
            src={participant.avatarUrl}
            alt={participant.username}
            style={{ width: '100%', height: '100%', borderRadius: '9999px', objectFit: 'cover' }}
          />
        ) : (
          <User size={16} color="gray" />
        )}
      </Flex>

      {/* Name & stats */}
      <Box flex="1" minW="0">
        <Text fontSize="sm" fontWeight="500" truncate>
          {participant.username}
        </Text>
        <Text fontSize="xs" color="gray.500">
          Прочитано {participant.booksRead} книг
        </Text>
      </Box>
    </Flex>
  );
}
