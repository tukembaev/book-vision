import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { CharacterProfile } from '@/types/core';

import { CharacterIllustrations } from './CharacterIllustrations.tsx';
import { CharacterDescription } from './CharacterDescription.tsx';
import { CharacterQuotes } from './CharacterQuotes.tsx';

export interface CharacterMainProps {
  character: CharacterProfile;
}

export function CharacterMain({ character }: CharacterMainProps) {
  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          {character.name}
        </Heading>
        <Text mt="2" opacity={0.8}>
          {character.aliases.filter((a) => a && a !== '—').join(' · ') || '—'}
        </Text>
      </Box>

      <CharacterIllustrations illustrations={character.illustrations} />

      <CharacterDescription
        noSpoilers={character.descriptionNoSpoilers}
        spoilers={character.descriptionSpoilers}
      />

      <CharacterQuotes noSpoilers={character.quotesNoSpoilers} spoilers={character.quotesSpoilers} />
    </Stack>
  );
}
