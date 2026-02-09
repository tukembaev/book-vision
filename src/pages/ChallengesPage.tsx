import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import {
  mockMyChallenges,
  mockFeaturedChallenges,
  mockCommunityChallenges,
} from '../features/challenges/mocks/challengesMock';

import { MyChallengesSection } from '../features/challenges/ui/MyChallengesSection/MyChallengesSection';
import { FeaturedChallengesSection } from '../features/challenges/ui/FeaturedChallengesSection/FeaturedChallengesSection';
import { CommunityChallengesSection } from '../features/challenges/ui/CommunityChallengesSection/CommunityChallengesSection';

export default function ChallengesPage() {
  return (
    <Box maxW="1200px" mx="auto" px="4" py="6">
      <Stack gap="10">
        {/* Page header */}
        <Flex justify="space-between" align="center">
          <Box>
            <Heading as="h2" fontSize="2xl" fontWeight="800">
              Челленджи
            </Heading>
            <Text mt="1" fontSize="sm" color="gray.500">
              Принимай вызовы, читай книги и соревнуйся с другими читателями
            </Text>
          </Box>
        </Flex>

        {/* Section 1 — My accepted challenges with progress */}
        <MyChallengesSection challenges={mockMyChallenges} />

        {/* Section 2 — Featured (site) challenges */}
        <FeaturedChallengesSection challenges={mockFeaturedChallenges} />

        {/* Section 3 — Best community challenges */}
        <CommunityChallengesSection challenges={mockCommunityChallenges} />
      </Stack>
    </Box>
  );
}
