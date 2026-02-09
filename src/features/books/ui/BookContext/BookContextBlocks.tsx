import { Badge, Box, Flex, Grid, Heading, HStack, Text } from '@chakra-ui/react';
import {
  BookOpenIcon,
  CalendarIcon,
  GlobeIcon,
  LandmarkIcon,
  LightbulbIcon,
  MapPinIcon,
  UsersIcon,
} from 'lucide-react';

import type { BookContextBlock, ContextBlockKind } from '../../mocks/bookContextDb.mock';

const kindConfig: Record<ContextBlockKind, { label: string; color: string; icon: React.ReactNode }> = {
  history: { label: 'История', color: 'blue', icon: <LandmarkIcon size={14} /> },
  social: { label: 'Общество', color: 'orange', icon: <UsersIcon size={14} /> },
  culture: { label: 'Культура', color: 'purple', icon: <GlobeIcon size={14} /> },
  biography: { label: 'Биография', color: 'teal', icon: <BookOpenIcon size={14} /> },
  geography: { label: 'География', color: 'green', icon: <MapPinIcon size={14} /> },
  philosophy: { label: 'Философия', color: 'pink', icon: <LightbulbIcon size={14} /> },
};

export interface BookContextBlocksProps {
  blocks: BookContextBlock[];
}

export function BookContextBlocks({ blocks }: BookContextBlocksProps) {
  if (blocks.length === 0) {
    return (
      <Box borderWidth="1px" borderRadius="xl" p="6" textAlign="center">
        <Text color="gray.400">Пока нет контекста для этой книги.</Text>
      </Box>
    );
  }

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="4">
      {blocks.map((b) => {
        const cfg = kindConfig[b.kind];
        return (
          <Box
            key={b.id}
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
            bg="white"
            _hover={{ shadow: 'sm' }}
            transition="all 0.2s"
          >
            {/* Color strip top */}
            <Box h="4px" bg={`${cfg.color}.400`} />

            <Box p="5">
              <Flex align="center" gap="2" mb="3">
                <Flex
                  w="28px"
                  h="28px"
                  borderRadius="lg"
                  bg={`${cfg.color}.50`}
                  align="center"
                  justify="center"
                  flexShrink={0}
                  color={`${cfg.color}.500`}
                >
                  {cfg.icon}
                </Flex>
                <Badge colorPalette={cfg.color} fontSize="2xs" variant="subtle">{cfg.label}</Badge>
                {b.yearRange && (
                  <HStack gap="0.5" fontSize="2xs" color="gray.400" ml="auto">
                    <CalendarIcon size={10} />
                    <Text>{b.yearRange}</Text>
                  </HStack>
                )}
              </Flex>

              <Heading as="h3" fontSize="sm" fontWeight="700" mb="2" lineHeight="short">
                {b.title}
              </Heading>

              <Text fontSize="sm" color="gray.600" lineHeight="tall">
                {b.text}
              </Text>

              <Flex gap="1" flexWrap="wrap" mt="3">
                {b.sources.map((src) => (
                  <Badge key={src} variant="outline" fontSize="2xs" textTransform="none" fontWeight="400">
                    {src}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
}
