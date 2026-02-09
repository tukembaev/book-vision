import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { BookOpenIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface WeeklyBookItem {
  clubId: string;
  clubName: string;
  bookId: string;
  bookTitle: string;
  weekLabel: string;
}

export interface WeeklyBooksWidgetProps {
  items: WeeklyBookItem[];
}

export function WeeklyBooksWidget({ items }: WeeklyBooksWidgetProps) {
  if (items.length === 0) return null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        📖 Читают на этой неделе
      </Heading>

      <Stack gap="2.5">
        {items.map((item) => (
          <Box key={item.clubId}>
            <HStack gap="1.5" mb="0.5">
              <BookOpenIcon size={13} color="var(--chakra-colors-gray-400)" />
              <AppLink to={`/books/${item.bookId}`} fontSize="sm" fontWeight="600">
                {item.bookTitle}
              </AppLink>
            </HStack>
            <Text fontSize="xs" color="gray.400" pl="5">
              <AppLink to={`/clubs/${item.clubId}`} color="gray.500" _hover={{ color: 'gray.700' }}>
                {item.clubName}
              </AppLink>
              {' · '}{item.weekLabel}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
