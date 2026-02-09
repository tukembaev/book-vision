import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Users } from 'lucide-react';

import type { ChallengeCardData } from '../../types/challenge.types';

export interface CommunityChallengeCardProps {
  challenge: ChallengeCardData;
}

export function CommunityChallengeCard({ challenge }: CommunityChallengeCardProps) {
  return (
    <Link to={`/challenges/${challenge.id}`} style={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        _hover={{ shadow: 'md', borderColor: 'purple.300' }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <Flex gap="3" align="flex-start">
          <Flex
            w="44px"
            h="44px"
            borderRadius="lg"
            align="center"
            justify="center"
            fontSize="xl"
            bg="purple.50"
            flexShrink={0}
          >
            {challenge.iconEmoji}
          </Flex>

          <Box flex="1" minW="0">
            <Heading as="h4" fontSize="sm" fontWeight="600" truncate>
              {challenge.title}
            </Heading>
            <Text fontSize="xs" color="gray.500" mt="1" lineClamp={2}>
              {challenge.description}
            </Text>

            <Flex gap="3" mt="2" fontSize="xs" color="gray.500" wrap="wrap">
              <Flex align="center" gap="1">
                <Layers size={12} />
                <Text>{challenge.sectionsCount} секций</Text>
              </Flex>
              <Flex align="center" gap="1">
                <BookOpen size={12} />
                <Text>{challenge.booksCount} книг</Text>
              </Flex>
              <Flex align="center" gap="1">
                <Users size={12} />
                <Text>{challenge.participantsCount}</Text>
              </Flex>
            </Flex>

            <Text fontSize="xs" color="gray.400" mt="1">
              от {challenge.createdBy}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
}
