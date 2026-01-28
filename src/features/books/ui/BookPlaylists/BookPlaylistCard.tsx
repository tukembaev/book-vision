import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { BookPlaylistLink } from '../../mocks/bookPlaylistsDb.mock';

export interface BookPlaylistCardProps {
  playlist: BookPlaylistLink;
}

export function BookPlaylistCard({ playlist }: BookPlaylistCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Heading as="h3" size="sm" fontWeight="600">
          {playlist.title}
        </Heading>
        <Text fontSize="sm" opacity={0.7}>
          {playlist.createdBy === 'system' ? 'Auto suggested' : 'User playlist'}
          {playlist.moodTag ? ` · ${playlist.moodTag}` : ''}
        </Text>

        {playlist.url ? (
          <Text fontSize="sm" opacity={0.85}>
            {playlist.url}
          </Text>
        ) : null}

        <Stack mt="2" gap="1">
          {playlist.tracks.map((t, idx) => (
            <Text key={`${playlist.id}-${idx}`} fontSize="sm" opacity={0.85}>
              {t}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
