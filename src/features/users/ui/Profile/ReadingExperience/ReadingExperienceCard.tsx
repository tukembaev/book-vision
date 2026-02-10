import { Box, Flex, Text } from '@chakra-ui/react';
import { BookOpen, StickyNote, Hash } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

import type { ReadingNote } from './readingExperience.mock';

export interface ReadingExperienceCardProps {
  note: ReadingNote;
}

export function ReadingExperienceCard({ note }: ReadingExperienceCardProps) {
  const date = new Date(note.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* Book + section header */}
      <Flex
        align="center"
        gap="3"
        px="4"
        py="2.5"
        borderBottomWidth="1px"
        bg="gray.50"
      >
        <BookOpen size={15} style={{ opacity: 0.5, flexShrink: 0 }} />
        <Box flex="1" minW="0">
          <AppLink to={`/books/${note.bookId}`} fontSize="sm" fontWeight="600" lineClamp={1}>
            {note.bookTitle}
          </AppLink>
        </Box>
      </Flex>

      {/* Note body */}
      <Box px="4" py="3">
        <Flex align="center" gap="2" mb="2">
          <StickyNote size={14} style={{ opacity: 0.5 }} />
          <Text fontSize="sm" fontWeight="600">
            {note.sectionTitle}
          </Text>
        </Flex>

        <Text fontSize="sm" lineHeight="tall" opacity={0.85}>
          {note.note}
        </Text>

        {/* Meta */}
        <Flex align="center" gap="4" mt="3" pt="2" borderTopWidth="1px">
          {note.pageNumber && (
            <Flex align="center" gap="1" opacity={0.5}>
              <Hash size={12} />
              <Text fontSize="xs">стр. {note.pageNumber}</Text>
            </Flex>
          )}
          <Text fontSize="xs" opacity={0.5}>
            {date}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
