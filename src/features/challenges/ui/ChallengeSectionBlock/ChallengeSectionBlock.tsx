import { Box, Heading } from '@chakra-ui/react';

import type { ChallengeSection } from '../../types/challenge.types';
import { ChallengeBookRow } from '../ChallengeBookRow/ChallengeBookRow';

export interface ChallengeSectionBlockProps {
  section: ChallengeSection;
}

export function ChallengeSectionBlock({ section }: ChallengeSectionBlockProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box bg="gray.50" px="4" py="3" borderBottomWidth="1px">
        <Heading as="h4" fontSize="sm" fontWeight="700">
          {section.title}
        </Heading>
      </Box>

      <Box>
        {section.books.map((book) => (
          <ChallengeBookRow key={book.id} book={book} />
        ))}
      </Box>
    </Box>
  );
}
