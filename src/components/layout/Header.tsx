import { Box, Flex, Heading } from '@chakra-ui/react';
import { AppLink } from '../navigation/AppLink';

export function Header() {
  return (
    <Box as="header" borderBottomWidth="1px">
      <Flex align="center" justify="space-between" px="6" py="4">
        <AppLink to="/">
          <Heading as="h1" size="md" fontWeight="600">
            Book
          </Heading>
        </AppLink>

        <Flex gap="4">
          <AppLink to="/">Главная</AppLink>
          <AppLink to="/users/u1">Профиль</AppLink>
        </Flex>
      </Flex>
    </Box>
  );
}
