import { Badge, Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { BookMarkedIcon, FileTextIcon } from 'lucide-react';

import type { BookWordExplanation } from '../../mocks/bookContextDb.mock';

export interface BookWordsListProps {
  words: BookWordExplanation[];
}

export function BookWordsList({ words }: BookWordsListProps) {
  if (words.length === 0) {
    return (
      <Box borderWidth="1px" borderRadius="xl" p="6" textAlign="center">
        <Text color="gray.400">Нет слов для пояснения.</Text>
      </Box>
    );
  }

  return (
    <Stack gap="3">
      {words.map((w) => (
        <Flex
          key={w.id}
          gap="4"
          p="4"
          borderWidth="1px"
          borderRadius="xl"
          bg="white"
          _hover={{ shadow: 'sm' }}
          transition="all 0.2s"
          align="flex-start"
        >
          {/* Left — word badge */}
          <Flex
            direction="column"
            align="center"
            gap="1"
            flexShrink={0}
            minW="80px"
          >
            <Flex
              w="40px"
              h="40px"
              borderRadius="xl"
              bg="yellow.50"
              align="center"
              justify="center"
              color="yellow.600"
            >
              <BookMarkedIcon size={18} />
            </Flex>
            <Text
              fontSize="xs"
              fontWeight="800"
              color="yellow.700"
              textAlign="center"
              lineHeight="short"
            >
              {w.word}
            </Text>
          </Flex>

          {/* Right — explanation */}
          <Box flex="1" minW="0">
            <Text fontSize="sm" color="gray.600" lineHeight="tall">
              {w.explanation}
            </Text>
            <HStack gap="2" mt="2" flexWrap="wrap">
              <Badge variant="outline" fontSize="2xs" textTransform="none" fontWeight="400">
                <FileTextIcon size={9} /> {w.source}
              </Badge>
              {w.pageRef && (
                <Text fontSize="2xs" color="gray.400">стр. {w.pageRef}</Text>
              )}
            </HStack>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
}
