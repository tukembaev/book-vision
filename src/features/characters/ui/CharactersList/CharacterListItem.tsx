import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Character } from '@/types/core';

export interface CharacterListItemProps {
  character: Character;
}

export function CharacterListItem({ character }: CharacterListItemProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Heading as="h4" size="sm" fontWeight="600">
          {character.name}
        </Heading>
        <Text opacity={0.85}>{character.description}</Text>
        <Text fontSize="sm" opacity={0.7}>
          Source: {character.source} · Verified: {character.verified ? 'yes' : 'no'}
        </Text>
      </Stack>
    </Box>
  );
}
