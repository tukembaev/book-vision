import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle } from 'lucide-react';

import type { ChallengeBook } from '../../types/challenge.types';
import { BookLengthBadge } from '../BookLengthBadge/BookLengthBadge';

export interface ChallengeBookRowProps {
  book: ChallengeBook;
}

export function ChallengeBookRow({ book }: ChallengeBookRowProps) {
  return (
    <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        gap="3"
        py="3"
        px="4"
        borderBottomWidth="1px"
        _hover={{ bg: 'gray.50' }}
        transition="background 0.15s"
        cursor="pointer"
      >
        {/* Read status icon */}
        <Box flexShrink={0} color={book.isRead ? 'green.500' : 'gray.300'}>
          {book.isRead ? <CheckCircle size={20} /> : <Circle size={20} />}
        </Box>

        {/* Book info */}
        <Box flex="1" minW="0">
          <Text fontSize="sm" fontWeight="500" truncate>
            {book.title}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {book.author} · {book.pagesCount} стр.
          </Text>
        </Box>

        {/* Length badge */}
        <BookLengthBadge length={book.length} />
      </Flex>
    </Link>
  );
}
