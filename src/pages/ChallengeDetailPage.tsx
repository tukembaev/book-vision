import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { getMockChallengeDetail } from '../features/challenges/mocks/challengesMock';
import { ChallengeHeader } from '../features/challenges/ui/ChallengeHeader/ChallengeHeader';
import { ChallengeSectionBlock } from '../features/challenges/ui/ChallengeSectionBlock/ChallengeSectionBlock';
import { ChallengeRanking } from '../features/challenges/ui/ChallengeRanking/ChallengeRanking';

export default function ChallengeDetailPage() {
  const { challengeId } = useParams<{ challengeId: string }>();

  const challenge = challengeId ? getMockChallengeDetail(challengeId) : undefined;

  if (!challenge) {
    return (
      <Box py="10" textAlign="center">
        <Heading fontSize="lg">Челлендж не найден</Heading>
        <Text mt="2" color="gray.500">
          Проверьте ссылку или вернитесь к списку челленджей.
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="1100px" mx="auto" px="4" py="6">
      <Stack gap="8">
        <ChallengeHeader challenge={challenge} />

        <Flex gap="6" direction={{ base: 'column', lg: 'row' }} align="flex-start">
          {/* Left — Sections with books */}
          <Box flex="3" minW="0">
            <Stack gap="5">
              {challenge.sections.map((section) => (
                <ChallengeSectionBlock key={section.id} section={section} />
              ))}
            </Stack>
          </Box>

          {/* Right — Ranking sidebar */}
          <Box flex="1.2" minW="280px" position={{ lg: 'sticky' }} top={{ lg: '80px' }}>
            <ChallengeRanking participants={challenge.participants} />
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
