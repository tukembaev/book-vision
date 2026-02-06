import { Box, Flex, Heading } from '@chakra-ui/react';

import { AppLink } from '../../navigation/AppLink/AppLink';
import { GlobalSearch } from '../../navigation/GlobalSearch/GlobalSearch';

export function Header() {
  return (
    <Box as="header" borderBottomWidth="1px" position="sticky" top="0" zIndex="sticky" bg="bg">
      <Flex align="center" justify="space-between" px="6" py="4">
        <AppLink to="/">
          <Heading as="h1" size="md" fontWeight="600">
            Book
          </Heading>
        </AppLink>

        <Flex align="center" gap="4">
          <AppLink to="/books">Книги</AppLink>
          <AppLink to="/articles">Статьи</AppLink>
          <AppLink to="/characters">Персонажи</AppLink>
          <AppLink to="/challenges">Челленджи</AppLink>
          <AppLink to="/users/u1">Профиль</AppLink>

          <GlobalSearch />
        </Flex>
      </Flex>
    </Box>
  );
}
