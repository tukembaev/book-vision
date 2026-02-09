import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { ListMusicIcon, SparklesIcon } from 'lucide-react';

import type { BookPlaylistLink } from '../../mocks/bookPlaylistsDb.mock';

const moodColors: Record<string, string> = {
  CALM: 'teal',
  DRAMA: 'red',
  TENSION: 'orange',
  MELANCHOLY: 'blue',
  MYSTERY: 'purple',
  ROMANCE: 'pink',
  TRAGEDY: 'gray',
  CUSTOM: 'gray',
};

export interface PlaylistCardCompactProps {
  playlist: BookPlaylistLink;
}

export function PlaylistCardCompact({ playlist }: PlaylistCardCompactProps) {
  const color = moodColors[playlist.moodTag ?? 'CUSTOM'] ?? 'gray';

  return (
    <Flex
      gap="3"
      p="3"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      _hover={{ shadow: 'sm', borderColor: `${color}.200` }}
      transition="all 0.2s"
      align="center"
    >
      <Flex
        w="32px"
        h="32px"
        borderRadius="md"
        bg={`${color}.50`}
        align="center"
        justify="center"
        flexShrink={0}
        color={`${color}.500`}
      >
        <ListMusicIcon size={14} />
      </Flex>

      <Box flex="1" minW="0">
        <Text fontSize="xs" fontWeight="600" truncate>
          {playlist.title}
        </Text>
        <HStack gap="1.5" mt="0.5">
          {playlist.moodTag && (
            <Badge colorPalette={color} fontSize="2xs" variant="subtle" textTransform="none" px="1">
              {playlist.moodTag}
            </Badge>
          )}
          <Text fontSize="2xs" color="gray.400">
            {playlist.tracks.length} трек{playlist.tracks.length === 1 ? '' : playlist.tracks.length < 5 ? 'а' : 'ов'}
          </Text>
        </HStack>
      </Box>

      {playlist.createdBy === 'system' && (
        <SparklesIcon size={12} color={`var(--chakra-colors-${color}-400)`} />
      )}
    </Flex>
  );
}
