import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { ChallengeDetail } from '../../types/challenge.types';

export interface ChallengeHeaderProps {
  challenge: ChallengeDetail;
}

export function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  const progressPercent = challenge.totalBooks > 0
    ? Math.round((challenge.readBooks / challenge.totalBooks) * 100)
    : 0;

  return (
    <Box>
      <Link to="/challenges">
        <Button variant="ghost" size="sm" mb="3">
          <ArrowLeft size={16} />
          Назад к челленджам
        </Button>
      </Link>

      <Flex gap="6" direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }}>
        {/* Icon */}
        <Flex
          w="120px"
          h="120px"
          borderRadius="2xl"
          align="center"
          justify="center"
          fontSize="5xl"
          bg={challenge.coverGradient}
          flexShrink={0}
        >
          {challenge.iconEmoji}
        </Flex>

        {/* Info */}
        <Box flex="1">
          <Text fontSize="xs" color="gray.500">
            {challenge.description}
          </Text>

          <Heading as="h1" fontSize="2xl" fontWeight="800" mt="1">
            {challenge.title}
          </Heading>

          {/* Progress bar */}
          <Box mt="3" maxW="400px">
            <Box bg="gray.200" borderRadius="full" h="8px" overflow="hidden">
              <Box
                bg="blue.500"
                h="100%"
                borderRadius="full"
                w={`${progressPercent}%`}
                transition="width 0.3s"
              />
            </Box>
            <Flex justify="space-between" mt="1">
              <Text fontSize="sm" color="gray.500">
                {challenge.readBooks} / {challenge.totalBooks}
              </Text>
              <Text fontSize="sm" color="gray.400">
                📖
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
