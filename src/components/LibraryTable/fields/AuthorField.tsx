import { useState, useMemo } from 'react';
import { Box, Text, Input, VStack, Popover, Portal } from '@chakra-ui/react';
import { searchAuthors } from '../mocks/libraryData.mock';
import type { AuthorInfo } from '../types';

interface AuthorFieldProps {
  author: string;
  authorId: string;
  onChange?: (authorId: string, authorName: string) => void;
  onHover?: () => void;
  readonly?: boolean;
}

export function AuthorField({ author, onChange, readonly }: AuthorFieldProps) {

  if (readonly || !onChange) {
    return (
      <Text fontSize="sm" cursor="default">
        {author}
      </Text>
    );
  }

  return (
   
        <Box
          px={2}
          py={1}
          borderRadius="md"
          cursor="pointer"
          display="inline-block"
        >
          <Text fontSize="sm">
            {author}
          </Text>
        </Box>
    
  );
}
