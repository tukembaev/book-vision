import { Box, Flex, Heading } from '@chakra-ui/react';

import { AppLink } from '../navigation/AppLink';
import { GlobalSearch } from '../navigation/GlobalSearch';

export function Header() {
  return (
    <Box as="header" borderBottomWidth="1px">
      <Flex align="center" justify="space-between" px="6" py="4">
        <AppLink to="/feed">
          <Heading as="h1" size="md" fontWeight="600">
            Book
          </Heading>
        </AppLink>

        <Flex align="center" gap="4">
          <AppLink to="/feed">Лента</AppLink>
          <AppLink to="/books">Книги</AppLink>
          <AppLink to="/characters">Персонажи</AppLink>
          <AppLink to="/challenges">Челленджи</AppLink>
          <AppLink to="/users/u1">Профиль</AppLink>

          <GlobalSearch />
        </Flex>
      </Flex>
    </Box>
  );
}
