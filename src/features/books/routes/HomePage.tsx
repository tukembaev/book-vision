import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink';

export default function HomePage() {
  return (
    <Box>
      <Stack gap="4">
        <Box>
          <Heading as="h2" size="md" fontWeight="700">
            Book Vision
          </Heading>
          <Text mt="2" opacity={0.8}>
            Минималистичный сайт-сообщество для осмысленного чтения.
          </Text>
        </Box>

        <Box>
          <Heading as="h3" size="sm" fontWeight="600">
            Разделы
          </Heading>
          <Stack mt="3" gap="2">
            <AppLink to="/feed" opacity={0.9}>
              Лента
            </AppLink>
            <AppLink to="/books" opacity={0.9}>
              Книги
            </AppLink>
            <AppLink to="/characters" opacity={0.9}>
              Персонажи
            </AppLink>
            <AppLink to="/challenges" opacity={0.9}>
              Челленджи
            </AppLink>
            <AppLink to="/users/u1" opacity={0.9}>
              Профиль
            </AppLink>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
