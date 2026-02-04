import { Box, Heading, Stack } from '@chakra-ui/react';

export function ProfileStatsCenter() {
  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Статистика
        </Heading>
      </Box>
    </Stack>
  );
}
