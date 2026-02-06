import { Box, Heading, Text } from '@chakra-ui/react';

export default function NotFoundPage() {
  return (
    <Box>
      <Heading as="h2" size="md" fontWeight="600">
        Страница не найдена
      </Heading>
      <Text mt="2" opacity={0.8}>
        Проверь адрес.
      </Text>
    </Box>
  );
}
