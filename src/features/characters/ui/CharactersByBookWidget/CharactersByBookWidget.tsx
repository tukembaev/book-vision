import { Box, Heading, Stack } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { CharactersByBookGroup } from '../../mocks/characterProfilesDb.mock';

export interface CharactersByBookWidgetProps {
  groups: CharactersByBookGroup[];
}

export function CharactersByBookWidget({ groups }: CharactersByBookWidgetProps) {
  if (groups.length === 0) return null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        📚 Персонажи по книгам
      </Heading>

      <Stack gap="3">
        {groups.map((g) => (
          <Box key={g.bookId}>
            <AppLink to={`/books/${g.bookId}`} fontSize="sm" fontWeight="600">
              {g.bookTitle}
            </AppLink>
            <Stack gap="1" mt="1">
              {g.characters.map((ch) => (
                <AppLink
                  key={ch.id}
                  to={`/characters/${ch.id}`}
                  fontSize="xs"
                  color="gray.500"
                  _hover={{ color: 'gray.700' }}
                >
                  {ch.name}
                </AppLink>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
