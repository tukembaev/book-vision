import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import type { MyChallengeData } from '../../types/challenge.types';

export interface MyChallengeCardProps {
  challenge: MyChallengeData;
}

export function MyChallengeCard({ challenge }: MyChallengeCardProps) {
  const progressPercent = Math.round(
    (challenge.progressCount / challenge.totalCount) * 100,
  );

  return (
    <Link to={`/challenges/${challenge.id}`} style={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        _hover={{ shadow: 'md', borderColor: 'blue.300' }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <Flex gap="3" align="center">
          <Flex
            w="48px"
            h="48px"
            borderRadius="lg"
            align="center"
            justify="center"
            fontSize="2xl"
            bg="gray.100"
            flexShrink={0}
          >
            {challenge.iconEmoji}
          </Flex>

          <Box flex="1" minW="0">
            <Heading as="h4" fontSize="sm" fontWeight="600" truncate>
              {challenge.title}
            </Heading>

            {/* Progress bar */}
            <Box mt="2" bg="gray.200" borderRadius="full" h="6px" overflow="hidden">
              <Box
                bg="blue.500"
                h="100%"
                borderRadius="full"
                w={`${progressPercent}%`}
                transition="width 0.3s"
              />
            </Box>

            <Flex justify="space-between" mt="1">
              <Text fontSize="xs" color="gray.500">
                Прогресс
              </Text>
              <Text fontSize="xs" fontWeight="600">
                <Text as="span" color="blue.500">
                  {challenge.progressCount}
                </Text>{' '}
                / {challenge.totalCount}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
}
