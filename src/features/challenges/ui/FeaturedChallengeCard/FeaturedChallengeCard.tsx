import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers } from 'lucide-react';

import type { ChallengeCardData } from '../../types/challenge.types';

export interface FeaturedChallengeCardProps {
  challenge: ChallengeCardData;
}

export function FeaturedChallengeCard({ challenge }: FeaturedChallengeCardProps) {
  return (
    <Link to={`/challenges/${challenge.id}`} style={{ textDecoration: 'none' }}>
      <Box
        borderRadius="xl"
        overflow="hidden"
        position="relative"
        h="220px"
        bg={challenge.coverGradient}
        p="5"
        color="white"
        cursor="pointer"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        transition="all 0.25s"
      >
        <Heading as="h4" fontSize="md" fontWeight="700" lineClamp={1}>
          {challenge.title}
        </Heading>

        <Text fontSize="xs" mt="1" opacity={0.85} lineClamp={2}>
          {challenge.description}
        </Text>

        <Flex gap="3" mt="3" fontSize="xs" opacity={0.9}>
          <Flex align="center" gap="1">
            <Layers size={13} />
            <Text>{challenge.sectionsCount} секций</Text>
          </Flex>
          <Flex align="center" gap="1">
            <BookOpen size={13} />
            <Text>{challenge.booksCount} книг</Text>
          </Flex>
        </Flex>

        {/* Large emoji icon */}
        <Flex
          position="absolute"
          bottom="3"
          right="4"
          fontSize="5xl"
          opacity={0.3}
          lineHeight="1"
        >
          {challenge.iconEmoji}
        </Flex>

        <Flex
          position="absolute"
          bottom="4"
          left="5"
          fontSize="xs"
          opacity={0.7}
          align="center"
          gap="1"
        >
          👥 {challenge.participantsCount}
        </Flex>
      </Box>
    </Link>
  );
}
