import { Badge, Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { ExternalLinkIcon, ListMusicIcon, SparklesIcon, UserIcon } from 'lucide-react';

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

export interface PlaylistCardWideProps {
  playlist: BookPlaylistLink;
}

export function PlaylistCardWide({ playlist }: PlaylistCardWideProps) {
  const color = moodColors[playlist.moodTag ?? 'CUSTOM'] ?? 'gray';
  const isSystem = playlist.createdBy === 'system';

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      _hover={{ shadow: 'sm' }}
      transition="all 0.2s"
    >
      {/* Color strip */}
      <Box h="3px" bg={`${color}.400`} />

      <Box p="4">
        <Flex justify="space-between" align="flex-start" gap="3">
          {/* Left: info */}
          <Flex gap="3" align="flex-start" flex="1" minW="0">
            <Flex
              w="40px"
              h="40px"
              borderRadius="lg"
              bg={`${color}.50`}
              align="center"
              justify="center"
              flexShrink={0}
              color={`${color}.500`}
            >
              <ListMusicIcon size={18} />
            </Flex>

            <Box flex="1" minW="0">
              <Text fontSize="sm" fontWeight="700" lineHeight="short">
                {playlist.title}
              </Text>

              <HStack gap="2" mt="1" flexWrap="wrap">
                {playlist.moodTag && (
                  <Badge colorPalette={color} fontSize="2xs" variant="subtle" textTransform="none">
                    {playlist.moodTag}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  fontSize="2xs"
                  textTransform="none"
                  colorPalette={isSystem ? 'purple' : 'gray'}
                >
                  {isSystem ? (
                    <><SparklesIcon size={9} /> auto</>
                  ) : (
                    <><UserIcon size={9} /> пользователь</>
                  )}
                </Badge>
              </HStack>
            </Box>
          </Flex>

          {/* External link */}
          {playlist.url && (
            <a href={playlist.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, paddingTop: '4px' }}>
              <Box color="gray.400" _hover={{ color: 'gray.600' }}>
                <ExternalLinkIcon size={16} />
              </Box>
            </a>
          )}
        </Flex>

        {/* Tracks */}
        <Stack mt="3" gap="1" pl="13">
          {playlist.tracks.map((track, idx) => (
            <Flex key={`${playlist.id}-${idx}`} align="center" gap="2">
              <Text fontSize="2xs" color="gray.300" fontWeight="700" w="16px" textAlign="right" flexShrink={0}>
                {idx + 1}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {track}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
