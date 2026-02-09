import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import type { ClubPoll } from '../../mocks/bookClubsDb.mock';

export interface ActivePollsWidgetProps {
  polls: (ClubPoll & { clubName: string })[];
}

export function ActivePollsWidget({ polls }: ActivePollsWidgetProps) {
  if (polls.length === 0) return null;

  const totalVotes = (p: ClubPoll) => p.options.reduce((s, o) => s + o.votes, 0);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        📊 Активные опросы
      </Heading>

      <Stack gap="3">
        {polls.map((poll) => {
          const total = totalVotes(poll);

          return (
            <Box key={poll.id}>
              <Text fontSize="sm" fontWeight="600" lineHeight="short" mb="1.5">
                {poll.question}
              </Text>

              <Stack gap="1">
                {poll.options.map((opt) => {
                  const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                  return (
                    <Flex key={opt.label} align="center" gap="2">
                      <Box
                        flex="1"
                        bg="gray.100"
                        borderRadius="sm"
                        h="18px"
                        overflow="hidden"
                        position="relative"
                      >
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          h="100%"
                          w={`${pct}%`}
                          bg="purple.200"
                          borderRadius="sm"
                          transition="width 0.3s"
                        />
                        <Text
                          position="relative"
                          fontSize="2xs"
                          fontWeight="500"
                          px="2"
                          lineHeight="18px"
                          truncate
                        >
                          {opt.label}
                        </Text>
                      </Box>
                      <Text fontSize="2xs" color="gray.500" w="30px" textAlign="right" flexShrink={0}>
                        {pct}%
                      </Text>
                    </Flex>
                  );
                })}
              </Stack>

              <Text fontSize="2xs" color="gray.400" mt="1">
                {poll.clubName} · {total} голосов
              </Text>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
